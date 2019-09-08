
docker-up:
	docker-compose rm -f
	docker-compose up --build

docker-test:
	docker-compose -f docker-compose-testing.yml up --abort-on-container-exit --build

.PHONYS: docker-up