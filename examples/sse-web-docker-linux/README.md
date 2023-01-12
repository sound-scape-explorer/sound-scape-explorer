# SSE Web Docker for Linux

This version only allows web visualization, it will not process your audio files!

## Steps

- Install and run Docker
  - [Debian](https://docs.docker.com/engine/install/debian/)
  - [Others](https://docs.docker.com/engine/install/)
- Paste your `features` and `generated` folders inside the main directory
- Open a terminal and `cd` to your project
- Run `./start.sh`
- Browse to [SSE Web](http://localhost:8080)

## Folder structure

Your project folder should look like this:

```
sse-web-docker-linux
├── features/ <- Paste me
├── generated/ <- Paste me
├── docker-compose.yml
├── README.md
└── start.sh <- Run me to start the app
```
