#!/bin/sh
set -e
echo "[cron] $(date): triggering daily-sync"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST http://api:3001/api/cron/daily-sync \
  -H "Authorization: Bearer ${API_SECRET}" \
  -H "Content-Type: application/json")
if [ "$STATUS" != "200" ]; then
  echo "[cron] ERROR: /api/cron/daily-sync returned HTTP $STATUS"
  exit 1
fi
echo "[cron] daily-sync enqueued successfully"
