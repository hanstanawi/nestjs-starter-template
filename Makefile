PROJECT = "NestJS Starter"

docker-up: ;@echo "Building and running ${PROJECT} containers....."; \
	docker compose up -d --build -V

docker-down: ;@echo "Shutting down ${PROJECT} containers....."; \
	docker compose down

docker-start: ;@echo "Starting ${PROJECT} containers....."; \
	docker compose start

docker-stop: ;@echo "Pausing ${PROJECT} containers....."; \
	docker compose stop

e2e-test: ;@echo "Setup ${PROJECT} E2E tests environment....."; \
	pnpm db:test:up
	pnpm db:test:deploy