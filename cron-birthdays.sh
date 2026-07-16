#!/usr/bin/env bash
# ============================================================
# Envío del email de cumpleaños de la semana (Debian/Linux)
#
# Pensado para ejecutarse desde una tarea programada de Dokploy.
# El HORARIO se configura en Dokploy, no aquí.
#   Cron sugerido: 0 12 * * 0   (todos los domingos a las 12:00)
#   Nota: si el servidor está en UTC, ajusta la hora a tu zona.
#
# Variables de entorno necesarias (defínelas en Dokploy):
#   APP_URL      -> URL pública de la app, ej. https://casadedios.es
#   CRON_SECRET  -> mismo valor que el CRON_SECRET del backend
# ============================================================

set -euo pipefail

# Si las variables no vienen del entorno (Dokploy), se leen del .env local.
ENV_FILE="$(dirname "$0")/.env"
get_env() { grep -E "^$1=" "$ENV_FILE" 2>/dev/null | tail -n1 | cut -d= -f2- || true; }
if [ -f "$ENV_FILE" ]; then
  : "${APP_URL:=$(get_env APP_URL)}"
  : "${CRON_SECRET:=$(get_env CRON_SECRET)}"
fi

: "${APP_URL:?Falta la variable APP_URL}"
: "${CRON_SECRET:?Falta la variable CRON_SECRET}"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Enviando email de cumpleaños..."

http_code=$(curl -s -o /dev/null -w "%{http_code}" \
  -X GET "${APP_URL}/api/cron/birthdays" \
  -H "Authorization: Bearer ${CRON_SECRET}")

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Respuesta HTTP: ${http_code}"

# Devuelve error si la petición no fue exitosa (2xx)
if [ "${http_code}" -lt 200 ] || [ "${http_code}" -ge 300 ]; then
  echo "ERROR: la petición falló (HTTP ${http_code})" >&2
  exit 1
fi
