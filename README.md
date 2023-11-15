## NestJS Starter Template

NestJS starter template with TypeScript and Prisma to kickstart your Node.js project.

### What's inside?

This starter template includes:

- [NestJS](https://nestjs.com/) - Modern and progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Your safety net when writing JavaScript
- [Prisma](https://prisma.io/) - Next generation Node.js and TypeScript ORM
- [pnpm](https://pnpm.io/) - Fast and efficient package manager
- [Docker]() - Blazingly fast frontend build tool
- [PostgreSQL](https://reactrouter.com/en/main) - Client side routing solution for React
- [pgAdmin](https://www.pgadmin.org/) - Open-source Postgres admin and development tools
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - Find & fix problems in the codebase and format code automatically on save
- [Makefile](https://lucide.dev/) - Beautiful and consistent open-source icons for React
- [Pino]() - Node.js logging tools
- [OpenAPI]() -
- [Husky](https://typicode.github.io/husky/) - Git hooks tool
  - [Commit Lint](https://commitlint.js.org/#/) - Force devs to follow conventional commit message
  - [Lint Staged](https://github.com/lint-staged/lint-staged) - Format & lint your code before committing, block commit if issues are detected
- [Github Actions](https://docs.github.com/en/actions) - Check, test, and build your code automatically on push and PR
- [Dependabot](https://github.com/dependabot) - Create pull-request to update your dependencies
- [Jest](https://jestjs.io/) - Unit test your components
- [Supertest](https://testing-library.com/docs/react-testing-library/intro/)

### Getting Started

1. Clone repo:

   Tips: You can use [degit](https://github.com/Rich-Harris/degit) to clone this repo without running `git clone`. [Learn more](https://github.com/Rich-Harris/degit)

   ```bash
   degit hanstanawi/nestjs-starter-template your-app-name
   ```

   or simply use this template on GitHub when creating new repository.

2. Install dependencies:

   Make sure you have [pnpm](https://pnpm.io/) installed. [Learn more](https://pnpm.io/installation) about installing pnpm.

   ```
   pnpm install
   ```

3. Run the development server

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:5137](http://localhost:5137) with your browser to see the result.

   You can start editing the page by modifying `App.tsx`. The page auto-updates as you edit the file.

### Prisma

### Docker

### Testing

This starter template has Jest and Supertest setup to run unit and integration API tests. Tests are automatically executed on every pull request and push by GitHub Actions CI workflow.

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
- Run e2e tests
  ```bash
  pnpm test:e2e
  ```

## Learn More

To learn more about React and TypeScript, take a look at the following resources:

- [Learn React](https://react.dev/learn) - learn about React fundamentals and APIs.
- [Learn TypeScript](https://learntypescript.dev/) - an interactive course to learn TypeScript
- [Learn TailwindCSS](https://tailwindcss.com/) - learn about TailwindCSS and its documentation
- [Learn React with TypeScript](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup) - learn about integrating React with TypeScript
