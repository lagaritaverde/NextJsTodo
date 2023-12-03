#!/bin/bash
docker-compose down
rm -r docker/postgres/data/
docker-compose up -d
