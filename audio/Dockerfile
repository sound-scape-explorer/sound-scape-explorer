FROM node:lts-alpine
LABEL maintainer="Bamdad Sabbagh <hi@bamdad.fr>"

RUN npm -g i serve

RUN adduser -D sse
USER sse

EXPOSE 3000

CMD ["npx", "serve", "/mount/audio", "--cors"]
