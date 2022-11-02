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

### Setup

#### Installing Docker

You will need **Docker** to be running on your machine. Install **Docker Desktop** for your
OS [here](https://www.docker.com/products/docker-desktop).

> Microsoft's systems will need **WSL2** in order to get Docker running.
>
> If the installer does not propose you to install it, please follow the Microsoft documentation
> [here](https://learn.microsoft.com/en-us/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)

#### Creating project folder

Create a local folder wherever you want to store your project.

It should contain the following items:

```
MY_PROJECT
├── audio/ <- contains all the audio files to analyze
├── config.xlsx <- configuration file for the app
└── docker-compose.yml <- configuration file for Docker
```

#### Downloading Docker configuration

##### Master / Main branch

> TODO

##### Development branches

`next/**` branches are used for development.

If you want to use them, download the
configuration [here](https://raw.githubusercontent.com/sound-scape-explorer/sound-scape-explorer/next/rewrite/docker-compose.next.yml)
.

Please note that the `next` branches are not stable and may contain bugs.

### Running the app

Open a terminal on Linux/macOS (or PowerShell on Windows).

Navigate to your folder.

Run the following command according to the Docker Composer configuration you downloaded:

```bash
# Linux/macOS
docker-compose -f docker-compose._FLAVOUR_.yml up
```

```powershell
# Windows
docker compose -f '.\docker-compose._FLAVOUR_.yml' up
```

#### First run

The first time you run the app, it will take a while to download the Docker images.

Depending on the power of your machine, the processing container will appear to hang while its actually extracting and
generating the features.

#### Accessing the app

Once the app is running and data analyzed, you can access the following services:

- [Front End](http://localhost:8080) `8080`
- [Back End](http://localhost:8081) `8081`
- [Legacy back end](http://localhost:9876) `9876`

### Optional: Run the project locally

#### Requirements

- Node.js
- Yarn
- Python 3.8

#### Installing dependencies

```bash
git clone git@github.com:sound-scape-explorer/sound-scape-explorer.git
cd sound-scape-explorer
yarn install
```

> TODO
>
> At the moment, `yarn install` also handles the data extraction and generation.
>
> This will be changed in the future.

#### Running the app

```bash
yarn dev
```

The same ports will be opened as with the Docker configuration.

## 🧑‍🤝‍🧑 Contributions

Feel free to open an issue or PR if you have any questions or suggestions.
