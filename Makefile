include .env
export $(shell sed 's/=.*//' .env)

docker-up:
	@docker-compose rm -f
	@docker-compose up --build

docker-test:
	@docker-compose rm -f 
	@docker-compose -f docker-compose-testing.yml up --abort-on-container-exit --build

docker-dev:
	@docker-compose rm -f
	@docker-compose -f docker-compose-dev.yml up --abort-on-container-exit --build
.PHONYS: docker-up
