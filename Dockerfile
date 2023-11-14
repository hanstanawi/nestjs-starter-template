###################
# DEV STAGE
###################
# Base image
FROM node:18 AS dev

# Install pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

# Required for Prisma Client to work in container
RUN apt-get update && apt-get install -y openssl

# Create app directory
WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

# Load packages into the virtual store form lockfile 
RUN pnpm fetch --prod

# Bundle app source
COPY --chown=node:node . .

# Install dependencies
RUN pnpm install --ignore-scripts

# Generate Prisma database client code
RUN pnpm db:generate

# Assign user permission
USER node

###################
# BUILD STAGE
###################
FROM node:18 AS build
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /usr/src/app

COPY --chown=node:node pnpm-lock.yaml ./

# In order to run `pnpm build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `pnpm install` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=dev /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN pnpm build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `pnpm install --prod` removes the existing node_modules directory and passing in --prod ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN pnpm install -P --ignore-scripts

USER node

###################
# PRODUCTION STAGE
###################
FROM node:18-alpine AS prod

WORKDIR /usr/src/app

# Only copy built files and production node_modules
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

