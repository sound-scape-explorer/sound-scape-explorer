<img alt="logo" width="80px" src="https://i.imgur.com/ZFnumtY.png">

**Sound Scape Explorer**

Audio data visualization and analysis tool for the web.

## 🔨 Features

- Use Machine Learning to extract audio features from audio files
- Visualize audio features as UMAP projections
- Visualize statistical distributions of audio features
- Listen to audio files in the browser
- Tag audio files with labels
- Share configurations and audio files with others with .xlsx files
- Run the app locally or in the cloud
- FOSS

## 📖 How To

### Requirements

You will need Docker to be running on your machine. Install Docker Desktop for your
OS [here](https://www.docker.com/products/docker-desktop).

Then, create a folder where you want to store your project.

This folder should container an `audio` folder with your audio files.

Place your `Excel` configuration file in the folder root.

```
YOUR_FOLDER
├── audio/
├── docker-compose.yml
└── config.xlsx
```

#### Windows with WSL2

Microsoft's systems will need an extra step in order to get Docker running.

If the installer does not propose you to install WSL2, please follow
the Microsoft
documentation [here](https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)
.

### Instructions

[Download](https://raw.githubusercontent.com/sound-scape-explorer/sound-scape-explorer/next/rewrite/docker-compose.next.yml)
the docker compose configuration file to the root of your folder.

Open a terminal on Linux or a PowerShell on Windows, navigate to your folder and run the following command:

```bash
# Linux
docker-compose -f docker-compose.next.yml up
```

```powershell
# Windows
docker compose '.\docker-compose.next.yml` up
```

Wait for the docker images to be downloaded and started.

Please note that the first time you run the app, it will take a while to download the docker images.

Depending on the power of your machine, the processing container will appear to hang while its actually extracting and
generating the features.

_You will notice that frontend and backend are available but not populated by data._

### Optional: Run the project locally

### 📝 URLs

- [Front](http://localhost:8080) `8080`
- [Back](http://localhost:8081) `8081`
- [Legacy](http://localhost:9876) `9876`

## 🧑‍🤝‍🧑 Contributions

Feel free to open an issue or PR if you have any questions or suggestions.
