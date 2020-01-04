#!/bin/sh
# This script serves as the entry point of the deployed application which is supposed to run in a Docker container.
# It substitutes the environment variables holding environment specific data in the index.html and then runs nginx.

envsubst < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index-processed.html
mv /usr/share/nginx/html/index-processed.html /usr/share/nginx/html/index.html
nginx -g 'daemon off;' || cat /usr/share/nginx/html/index.html
