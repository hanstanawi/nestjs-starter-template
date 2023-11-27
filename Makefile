PROJECT = "NestJS Starter"

docker-up: ;@echo "Building and running ${PROJECT} containers....."; \
	docker compose up -d --build

docker-down: ;@echo "Shutting down ${PROJECT} containers....."; \
	docker compose down

docker-start: ;@echo "Starting ${PROJECT} containers....."; \
	docker compose start

docker-stop: ;@echo "Pausing ${PROJECT} containers....."; \
	docker compose stop

# need to wait 1 s for container to start
e2e-test-up: ;@echo "Running ${PROJECT} E2E tests environment....."; \
	pnpm db:test:up
	sleep 1 
	pnpm db:test:deploy

e2e-test-down: ;@echo "Shutting down ${PROJECT} E2E tests environment....."; \
	pnpm db:test:down