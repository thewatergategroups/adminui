REPOSITORY := authui

build:
	docker build --network=host \
	-f ./Dockerfile \
	. -t ghcr.io/thewatergategroups/$(REPOSITORY):latest

run: build up

dev:
	devspace sync --upload-only --namespace apps --container authui

up: 
	docker compose up -d --remove-orphans

down: 
	docker compose down

debug:
	docker compose run -it $(REPOSITORY) bash

push: build
	docker push  ghcr.io/thewatergategroups/$(REPOSITORY):latest

template:
	if [ ! -f secret_vals.yaml ]; then echo "secrets: {}" > secret_vals.yaml; fi
	helm template ./helm/$(REPOSITORY) -f secret_vals.yaml --debug > template.yaml
