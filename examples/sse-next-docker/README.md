# SSE Next Docker for Windows

This is the developer version of Sound Scape Explorer.

It will process your audio data through `.xlsx` configuration.

## Steps

- Install and run [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Open the `sample` folder and import the following:
  - Paste your audio samples inside the `audio` directory
  - Edit the `config.xlsx` configuration file to manage your processing settings
- Right-click on `start.ps1` then select `Run with PowerShell`
- Browse to [SSE Web](http://localhost:8080)

## Folder structure

Your project folder should look like this:

```
sse-next-docker-windows
├── sample/
│   ├── audio/ <- Import files in me
│   └── config.xlsx <- Edit me
├── docker-compose.yml
├── README.md
├── start.ps1 <- Run me to start the app
```
