###################
# BASE
###################
FROM node:18-alpine AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Create app directory
WORKDIR /app
COPY --chown=node:node . /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm fetch --prod

###################
# PROD DEPS
###################
FROM base AS prod-deps
ENV NODE_ENV production
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts
USER node

###################
# BUILD STAGE
###################
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm prisma generate
RUN pnpm build
USER node

###################
# PRODUCTION STAGE
###################
FROM node:18-alpine AS prod

WORKDIR /app

# Only copy built files and production node_modules
COPY --chown=node:node --from=prod-deps app/node_modules ./node_modules
COPY --chown=node:node --from=build app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

