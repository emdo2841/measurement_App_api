#!/bin/bash
# Zero-downtime rolling deploy.
# Run this ON THE SERVER, from the repo root (~/deploy/measurement_App_api).
set -e

COMPOSE="docker compose -f docker-compose.yaml"
APP_SERVICES=("app1" "app2" "app3")
HEALTH_TIMEOUT=60   # seconds to wait for each app container to become healthy

echo "==> Pulling latest code"
git fetch origin
git reset --hard origin/main

echo "==> Building the shared app image (used by app1, app2, app3, migration)"
docker build -t measurement_app_api-app:latest -f Dockerfile .

echo "==> Applying database migrations"
$COMPOSE up -d migration
sleep 2
MIGRATION_EXIT=$($COMPOSE ps -a migration --format json | python3 -c "import json,sys; print(json.load(sys.stdin).get('ExitCode', 1))" 2>/dev/null || echo 1)
if [ "$MIGRATION_EXIT" != "0" ]; then
  echo "!! Migration failed (exit $MIGRATION_EXIT). Aborting deploy — apps were NOT touched."
  $COMPOSE logs migration --tail=50
  exit 1
fi
echo "==> Migration succeeded"

wait_healthy() {
  local service=$1
  local container="measurement_app_api-${service}-1"
  local waited=0
  echo "==> Waiting for $service to become ready..."

  has_healthcheck=$(docker inspect -f '{{if .State.Health}}yes{{else}}no{{end}}' "$container" 2>/dev/null || echo "no")

  if [ "$has_healthcheck" = "no" ]; then
    sleep 5
    if [ "$(docker inspect -f '{{.State.Running}}' "$container" 2>/dev/null)" = "true" ]; then
      echo "==> $service is running (no healthcheck defined)"
      return 0
    else
      echo "!! $service is not running"
      $COMPOSE logs "$service" --tail=50
      return 1
    fi
  fi

  while true; do
    status=$(docker inspect -f '{{.State.Health.Status}}' "$container" 2>/dev/null || echo "starting")
    if [ "$status" = "healthy" ]; then
      echo "==> $service is healthy"
      return 0
    fi
    if [ "$waited" -ge "$HEALTH_TIMEOUT" ]; then
      echo "!! $service did not become healthy within ${HEALTH_TIMEOUT}s"
      $COMPOSE logs "$service" --tail=50
      return 1
    fi
    sleep 2
    waited=$((waited + 2))
  done
}

for service in "${APP_SERVICES[@]}"; do
  echo "==> Rolling $service"
  # NOTE: no --build here anymore — the image was already built above.
  # --no-deps just recreates this one container with the new image.
  $COMPOSE up -d --no-deps "$service"

  if ! wait_healthy "$service"; then
    echo "!! Rollout of $service failed health check. Stopping here — $service may be down."
    echo "!! Remaining services were not touched. Investigate before retrying."
    exit 1
  fi

  echo "==> Verifying site is still reachable"
  if ! curl -sf -o /dev/null "http://localhost"; then
    echo "!! Site check failed after rolling $service"
    exit 1
  fi
done

echo "==> Deploy complete. All app instances updated with zero downtime."