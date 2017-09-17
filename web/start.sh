#!/bin/bash

# Production Web Command
echo "Starting..."

case $1 in
  web-production)
    echo "|_ Web Production"
    # Perhaps add check to make sure we can contact db
    python manage.py migrate
    gunicorn -c soundproud/gunicorn_config.py soundproud.wsgi -b 0.0.0.0:8000
    echo "  |_ Finished!"
esac
