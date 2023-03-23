# Build
FROM node:lts-alpine AS build

WORKDIR /app

COPY .eslintrc.js .
COPY env.d.ts .
COPY tsconfig.app.json .
COPY tsconfig.config.json .
COPY tsconfig.json .
COPY vite.config.js .
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY index.html .
COPY public public
COPY src src
RUN yarn build

# Dependencies
FROM node:lts-alpine as dependencies

WORKDIR /app

ENV NODE_ENV=production

COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile

# Run
FROM node:lts-alpine
LABEL maintainer="Bamdad Sabbagh <hi@bamdad.fr>"

RUN npm -g i vite

RUN adduser -D sse
USER sse

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json .

EXPOSE 8080
CMD ["yarn", "preview"]
