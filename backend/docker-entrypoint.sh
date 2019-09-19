#!/bin/sh

WORKERS=6
WORKER_TEMP_DIR=/dev/shm
WORKER_CLASS=gevent
ACCESS_LOG=-
ERROR_LOG=-

until nc -z -v -w30 db 3306
do
  echo "Waiting for database connection..."
  # wait for 5 seconds before check again
  sleep 5
done

# Start Backend
echo "Starting Backend"
exec gunicorn 'app:create_app()' \
    --bind '0.0.0.0:5000' \
    --workers $WORKERS \
    --worker-tmp-dir "$WORKER_TEMP_DIR" \
    --worker-class "$WORKER_CLASS" \
    --access-logfile "$ACCESS_LOG" \
    --error-logfile "$ERROR_LOG"