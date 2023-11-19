REPOSITORY := todos-ui

build:
	docker build --network=host \
	-f docker/Dockerfile \
	. -t $(REPOSITORY)

run: build up

up: 
	docker compose up -d --remove-orphans

down: 
	docker compose down


