## NestJS Starter Template

NestJS starter template with TypeScript and Prisma to kickstart your Node.js project.

### What's inside?

This starter template includes:

- [NestJS](https://nestjs.com/) - Modern and progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Your safety net when writing JavaScript
- [Prisma](https://prisma.io/) - Next generation Node.js and TypeScript ORM
- [pnpm](https://pnpm.io/) - Fast and efficient package manager
- [Docker](https://docs.docker.com/get-started/) - Develop, ship, and run your app with containers
- [PostgreSQL](https://www.postgresql.org/) - Popular open-source SQL relational database management system
- [pgAdmin](https://www.pgadmin.org/) - Open-source Postgres admin and development tools
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - Find & fix problems in the codebase and format code automatically on save
- [Makefile](https://makefiletutorial.com/) - Handy automation tool to run and compile your programs more efficiently
- [Pino](https://getpino.io) - Node.js logging tools
- [OpenAPI](https://swagger.io/resources/open-api/) - Standard specification for HTTP APIs
- [Husky](https://typicode.github.io/husky/) - Git hooks tool
  - [Commit Lint](https://commitlint.js.org/#/) - Force devs to follow conventional commit message
  - [Lint Staged](https://github.com/lint-staged/lint-staged) - Format & lint your code before committing, block commit if issues are detected
- [Github Actions](https://docs.github.com/en/actions) - Check, test, and build your code automatically on push and PR
- [Dependabot](https://github.com/dependabot) - Create pull-request to update your dependencies
- [Jest](https://jestjs.io/) - Popular JavaScript unit testing library
- [Supertest](https://github.com/ladjs/supertest) - SuperAgent driven library for testing HTTP servers

### Getting Started

1. Clone repo:

   Tips: You can use [degit](https://github.com/Rich-Harris/degit) to clone this repo without running `git clone`. [Learn more](https://github.com/Rich-Harris/degit)

   ```bash
   degit hanstanawi/nestjs-starter-template your-app-name
   ```

   or simply use this template on GitHub when creating new repository.

2. Install dependencies:

   Make sure you have [pnpm](https://pnpm.io/) installed. [Learn more](https://pnpm.io/installation) about installing pnpm.

   ```bash
   pnpm install
   ```

3. Install Nest CLI

   Nest CLI is a great command-line interface tool that helps you to initialize, develop, and maintain your Nest project. You need to install it globally in order to run the `nest` command in terminal.

   ```bash
   pnpm -g add @nestjs/cli
   ```

4. Run the database

   Since this project uses Prisma ORM. The Postgres database container needs to be running upon the project init to avoid any Prisma connection error.

   ```bash
   pnpm db:up
   ```

   To learn more about running databases using Docker. Checkout the [Prisma](#prisma) section.

5. Run the development server

   ```bash
   pnpm start:dev
   ```

6. Make a request to [http://localhost:3333](http://localhost:3333) with cURL to see the result.

   ```bash
   curl --location "http://localhost:3333/api/v1"
   ```

   You can start editing the project by modifying `app.module.ts` or create a new module by running

   ```bash
   nest g module your-new-module
   ```

   The project auto-updates as you edit the file.

### Docker

You can run this project without having Node.js installed on your machine by running it using Docker as a container. You can learn more about Docker [here](https://docs.docker.com/get-started/).

Make sure Docker is installed and Docker daemon is running on your machine. You can learn more how to download and setup Docker [here](https://www.docker.com/products/docker-desktop/).

1. Run the Docker containers using Docker Compose

   ```bash
   docker compose up -d --build
   ```

2. Stop running containers

   ```bash
   docker compose down
   ```

You can also run these commands with `make` command based on this project's [Makefile](./Makefile) configuration to avoid memorizing the long `docker` commands.

1. Run containers

   ```bash
   make docker-run
   ```

2. Stop container

   ```bash
   make docker-stop
   ```

### Prisma

This NestJS starter template comes with Prisma ORM, a modern Node.js and TypeScript ORM that works really well with NestJS. You can check the full official guide to get started with NestJS and Prisma [here](https://www.prisma.io/nestjs).

1. Running the database

   It only runs Postgres container with Docker Compose

   ```bash
   pnpm db:up
   ```

2. Create a database migration

   Whenever you make any changes to the `schema.prisma` file, you need to create a migration to reflect the changes you made on the schema to the database.

   To create a migration, simply run this command, then enter the name of the migration. e.g. `add_user_table`

   ```bash
   pnpm prisma migrate dev
   ```

3. Run existing migrations

   ```bash
   pnpm db:deploy
   ```

4. Generate Prisma Client

   It runs the `prisma generate` command under the hood to generate type definitions based on the `schema.prisma` schema.

   ```bash
   pnpm db:generate
   ```

5. Run Prisma Studio

   It runs the [Prisma Studio](https://www.prisma.io/studio) tools to open Prisma database admin client tools.

   ```bash
   pnpm db:studio
   ```

### Unit Testing

This starter template has Jest setup to run unit and integration API tests. Tests are automatically executed on every pull request and push by GitHub Actions CI workflow.

You can run unit tests and e2e tests manually on your machine:

- Run all unit tests
  ```bash
  pnpm test
  ```
- Run test in watch mode
  ```bash
  pnpm test:watch
  ```
- Unit test coverage
  ```bash
  pnpm test:cov
  ```

### Integration Testing

This starter template has integration tests with Jest and Supertest setup out of the box. In integration tests, we test the full feature of each APIs to ensure each API behave correctly and spot bugs early.

We need to test the database connection and integration with the app. Therefore, before we run integration tests, all database connection needs to be setup. Different database for integration tests needs to be setup, so it will not disturb our development database. The Postgres test database container configuration can be found in `docker-compose.test.yaml` to learn more.

1. Create `.env.test` file to load env variables for test environment

   Your existing `.env` variables may vary. However, you should change these `.env` variables to test variables

   ```plaintext
   POSTGRES_USERNAME="YOUR_TEST_DB_USERNAME"
   POSTGRES_PASSWORD="YOUR_TEST_DB_PASSWORD"
   POSTGRES_DB="YOUR_TEST_DB_NAME"
   DATABASE_URL=""
   ```

2. Run integration test setup script

   ```bash
   make e2e-test-up
   ```

   In this script, it runs the Postgres docker container test database and run existing migrations to test database.

3. Run integration tests

   - Run all integration tests

     ```bash
     pnpm test:e2e
     ```

   - Watch mode

     ```bash
     pnpm test:e2e:watch
     ```

4. Stop Postgres test database container

   ```bash
   make e2e-test-down
   ```

### OpenAPI Specification

This starter template has [OpenAPI Swagger](https://swagger.io/specification/) documentation setup out of the box. You can update the API documentation based to your liking on your application API specification. To learn more about OpenAPI with NestJS configuration, you can visit the documentation [here](https://docs.nestjs.com/openapi/introduction).

To view OpenAPI documentation page

1. Start the development server

   ```bash
   pnpm start:dev
   ```

   Don't forget to start the postrges container, otherwise Prisma will throw a connection error when starting up the app.

   ```bash
   pnpm db:up
   ```

2. Open your browser and visit [http://localhost:3333/api](http://localhost:3333/api) to view the API documentation.

### Learn More

To learn more about NestJS and its ecosystem, take a look at the following resources:

- [Learn NestJS](https://docs.nestjs.com/) - learn about NestJS fundamentals, techniques, and recipes.
- [Learn NestJS tutorial series](https://wanago.io/courses/api-with-nestjs/) - comprehensive tutorial to learn NestJS from the ground up.
- [Learn TypeScript](https://learntypescript.dev/) - an interactive course to learn TypeScript
- [Learn Prisma](https://prisma.io/) - learn about Prisma ORM core concepts, queries, and migrations.
- [Learn Building REST API with NestJS and Prisma](https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0) - learn about building a REST API with NestJS and Prisma
- [Learn PostgreSQL](https://www.postgresqltutorial.com/) - learn the fundamentals of PostgreSQL
- [Learn Docker](https://docs.docker.com/get-started/) - learn about the basics of Docker
- [Learn Testing with Prisma](https://www.prisma.io/blog/series/ultimate-guide-to-testing-eTzz0U4wwV) - learn about multiple testing techniques with Prisma
