
docker-up:
	docker-compose rm -f
	docker-compose up --build

.PHONYS: docker-up