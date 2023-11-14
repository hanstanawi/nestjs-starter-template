# Base image
FROM node:18-alpine

# Install pnpm
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm 

# Create app directory
WORKDIR /user/src/app

# Copy pnpm lockfile
COPY --chown=node:node pnpm-lock.yaml ./

# Load packages into the virtual store form lockfile 
RUN pnpm fetch --prod

# Bundle app source
COPY --chown=node:node . .

# Install dependencies
RUN pnpm install

# Assign user permission
USER node

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

