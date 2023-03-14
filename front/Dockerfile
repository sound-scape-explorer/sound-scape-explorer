FROM node:lts-alpine
LABEL maintainer="Bamdad Sabbagh <hi@bamdad.fr>"

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

EXPOSE 8080

CMD ["yarn", "preview"]
