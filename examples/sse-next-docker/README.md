# SSE Next for Docker

This is the developer version, expect instability.

## Steps

- Install and run Docker.
  - Linux
    - [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Debian](https://docs.docker.com/engine/install/debian/)
    - [Other](https://docs.docker.com/engine/install/)
  - Windows
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
