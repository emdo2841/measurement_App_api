#!/bin/bash
# Run this ONCE, after DNS for your domain already points at this server's public IP.
# Usage: ./init-letsencrypt.sh yourdomain.com you@email.com

set -e

if [ $# -lt 2 ]; then
  echo "Usage: $0 <domain> <email>"
  exit 1
fi

DOMAIN=$1
EMAIL=$2
DATA_PATH="./certbot"
RSA_KEY_SIZE=4096
COMPOSE="docker compose -f docker-compose.yaml"

# 1. Put the real domain into nginx.conf
sed -i "s/YOUR_DOMAIN/${DOMAIN}/g" ./nginx.conf

# 2. Fetch recommended TLS params (referenced by nginx.conf)
mkdir -p "$DATA_PATH/conf"
if [ ! -e "$DATA_PATH/conf/options-ssl-nginx.conf" ]; then
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "$DATA_PATH/conf/options-ssl-nginx.conf"
  curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "$DATA_PATH/conf/ssl-dhparams.pem"
fi

# 3. Dummy cert so nginx can start (certbot needs nginx running for the HTTP-01 challenge)
mkdir -p "$DATA_PATH/conf/live/$DOMAIN"
$COMPOSE run --rm --entrypoint "\
  openssl req -x509 -nodes -newkey rsa:$RSA_KEY_SIZE -days 1 \
    -keyout '/etc/letsencrypt/live/$DOMAIN/privkey.pem' \
    -out '/etc/letsencrypt/live/$DOMAIN/fullchain.pem' \
    -subj '/CN=localhost'" certbot

# 4. Start nginx with the dummy cert
$COMPOSE up -d nginx

# 5. Delete dummy cert, request the real one
$COMPOSE run --rm --entrypoint "\
  rm -rf /etc/letsencrypt/live/$DOMAIN && \
  rm -rf /etc/letsencrypt/archive/$DOMAIN && \
  rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

$COMPOSE run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL -d $DOMAIN \
    --rsa-key-size $RSA_KEY_SIZE --agree-tos --non-interactive" certbot

# 6. Reload nginx with the real certificate
$COMPOSE exec nginx nginx -s reload

echo "Done. HTTPS is live for https://$DOMAIN"
