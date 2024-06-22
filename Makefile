REPOSITORY := adminui

build:
	docker build --network=host \
	-f ./Dockerfile \
	. -t ghcr.io/thewatergategroups/$(REPOSITORY):latest

dev:
	devspace sync --upload-only --namespace apps --container adminui

up: 
	docker compose up -d --remove-orphans
	node server.js
down: 
	docker compose down

debug:
	docker compose run -it $(REPOSITORY) bash

push: build
	docker push  ghcr.io/thewatergategroups/$(REPOSITORY):latest

template:
	if [ ! -f secret_vals.yaml ]; then echo "secrets: {}" > secret_vals.yaml; fi
	helm template ./helm/$(REPOSITORY) -f secret_vals.yaml --debug > template.yaml
