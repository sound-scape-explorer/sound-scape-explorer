# SSE Web Docker for Windows

This version only allows web visualization, it will not process your audio files!

## Steps

- Install and run [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Paste your `features` and `generated` folders inside the main directory
- Right-click on `start.ps1` then select `Run with PowerShell`
- Browse to [SSE Web](http://localhost:8080)

## Folder structure

Your project folder should look like this:

```
sse-web-docker-windows
├── features/ <- Paste me
├── generated/ <- Paste me
├── docker-compose.yml
├── README.md
├── start.ps1 <- Run me to start the app
└── start-example.png <- Screenshot of what you should get after running `start.ps1`
```

## Screenshot

After running `start.ps1`, you should
get [this](https://raw.githubusercontent.com/sound-scape-explorer/sound-scape-explorer/main/examples/sse-web-docker-windows/example.png).
