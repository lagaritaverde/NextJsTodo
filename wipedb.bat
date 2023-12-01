docker-compose down
del /s /Q docker\postgres\data\*
docker-compose up -d