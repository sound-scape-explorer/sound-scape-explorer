FROM node:lts-alpine
LABEL maintainer="Bamdad Sabbagh <hi@bamdad.fr>"

RUN npx -p serve

EXPOSE 3000

CMD ["npx", "serve", "/mount/audio", "--cors"]
