#!/bin/bash
set -e

# Create a dedicated replication user that replicas will authenticate as
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD '$POSTGRES_PASSWORD';
EOSQL

# Allow replication connections and normal connections from anywhere on the
# Docker network. This is fine for local dev; do not use 0.0.0.0/0 like this
# in a production/public-facing deployment.
echo "host replication replicator 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"
echo "host all all 0.0.0.0/0 md5" >> "$PGDATA/pg_hba.conf"