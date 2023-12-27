REPOSITORY := authui

build:
	docker build --network=host \
	-f docker/Dockerfile \
	. -t $(REPOSITORY)

run: build up

up: 
	docker compose up -d --remove-orphans

down: 
	docker compose down

debug:
	docker compose run -it $(REPOSITORY) bash

push: build
	docker tag $(REPOSITORY):latest ghcr.io/1ndistinct/$(REPOSITORY):latest
	docker push  ghcr.io/1ndistinct/$(REPOSITORY):latest

template:
	if [ ! -f secret_vals.yaml ]; then echo "secrets: {}" > secret_vals.yaml; fi
	helm template ./helm/$(REPOSITORY) -f secret_vals.yaml --debug > template.yaml
