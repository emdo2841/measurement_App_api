#!/bin/bash
set -e

# Only clone from the primary the first time this container's data
# directory is empty. On every subsequent restart, PGDATA already has a
# valid standby cluster and Postgres just resumes streaming normally.
if [ -z "$(ls -A "$PGDATA" 2>/dev/null)" ]; then
  echo "PGDATA is empty. Cloning primary via pg_basebackup..."

  until pg_basebackup -h "$PRIMARY_HOST" -D "$PGDATA" -U replicator -Fp -Xs -P -R; do
    echo "Primary not ready yet, retrying in 2s..."
    sleep 2
  done

  chmod 0700 "$PGDATA"
  echo "Clone complete. Starting as standby."
fi

# Hand off to the normal Postgres entrypoint. Since PGDATA is now
# non-empty, it skips initdb entirely and just starts the server —
# pg_basebackup's -R flag already wrote standby.signal and configured
# primary_conninfo, so it comes up in standby/replica mode automatically.
exec docker-entrypoint.sh postgres