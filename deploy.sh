#!/bin/bash
# Zero-downtime rolling deploy.
# Run this ON THE SERVER, from the repo root (~/deploy/measurement_App_api).
set -e

COMPOSE="docker compose -f docker-compose.yaml"
APP_SERVICES=("app1" "app2" "app3")
HEALTH_TIMEOUT=60   # seconds to wait for each app container to become healthy

echo "==> Pulling latest code"
git pull

echo "==> Building images"
$COMPOSE build

echo "==> Applying database migrations"
$COMPOSE up -d migration
# Wait for the one-off migration container to actually exit before checking its code
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

  # If the service has no HEALTHCHECK defined in compose, docker inspect returns
  # an empty/'<no value>' status forever — fall back to just checking the
  # container is running, plus the curl check that follows this function.
  has_healthcheck=$(docker inspect -f '{{if .State.Health}}yes{{else}}no{{end}}' "$container" 2>/dev/null || echo "no")

  if [ "$has_healthcheck" = "no" ]; then
    sleep 5   # give the process a moment to boot
    if [ "$(docker inspect -f '{{.State.Running}}' "$container" 2>/dev/null)" = "true" ]; then
      echo "==> $service is running (no healthcheck defined, add one for stronger guarantees)"
      return 0
    else
      echo "!! $service is not running"
      docker compose -f docker-compose.yaml logs "$service" --tail=50
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
      docker compose -f docker-compose.yaml logs "$service" --tail=50
      return 1
    fi
    sleep 2
    waited=$((waited + 2))
  done
}

for service in "${APP_SERVICES[@]}"; do
  echo "==> Rolling $service"
  $COMPOSE up -d --no-deps --build "$service"

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