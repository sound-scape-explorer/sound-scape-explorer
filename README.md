<p align="center">
  <img alt="logo" width="200px" src="https://i.imgur.com/ZFnumtY.png">
</p>

<p align="center">
  <strong>Soundscape Explorer</strong>
</p>

<p align="center">
  Process. Explore. Analyze.
</p>

---

- Set up your project with shareable `.xlsx` configuration.
- Extract data from your audio files to shareable `.h5` file.
- Visualize data in your web browser [online](https://sound-scape-explorer.github.io/sound-scape-explorer/)
  or [offline](http://localhost:8080).

> If you already have your `.h5` file and only want to visualize your data with no audio playback, you can directly use
> the [online front end](https://sound-scape-explorer.github.io/sound-scape-explorer/).

## 👨‍🏫 For researchers

### 🐋 Docker

Install and run Docker.

- [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Debian](https://docs.docker.com/engine/install/debian/)
- [Other](https://docs.docker.com/engine/install/)
- [Windows](https://www.docker.com/products/docker-desktop)

### ⚙️ Configure your project

[Download the configuration template](https://github.com/sound-scape-explorer/sound-scape-explorer/raw/main/examples/common/config.xlsx)
and set up your project!

### 💽 Generate your data

1. Select a template from the available
   flavors. [Go to downloads](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest).
2. Edit the `project.env` text file and specify requested paths and filenames.
3. Run the startup script according to your operating system.

| SSE Flavor | Use case                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| SSE Audio  | Use this if you already have your `.h5` and want to use the [online front end](https://sound-scape-explorer.github.io/sound-scape-explorer/). |
| SSE CPU    | Use this if you want to generate your `.h5` using your CPU (slower).                                                                          |
| SSE CUDA   | Use this if you want to generate your `.h5` using your GPU with CUDA acceleration (faster).                                                   |
| SSE Front  | Use this if you already have your `.h5` and intend to work offline by using the [offline front end](http://localhost:8080).                   |

## 👨‍💻 For programmers

### ⚓ Requirements

#### Git

You can either use git to clone the repository or download a zip

- Git
  - Check: `git --version`
  - Install: `sudo apt install git`
- [Python 3.8.10](https://www.python.org/downloads/)
  - Check: `python3 --version`
  - Install pip: `sudo apt install python3-pip`
- [Node.js](https://nodejs.org/en/)
  - Check: `node --version`
- [pnpm](https://pnpm.io/installation#using-npm)
  - Install: `sudo npm i -g pnpm`

#### Node.js

Check your version

```bash
node --version
```

Install on ubuntu

curl required

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

#### pnpm

### 🎛️ Instructions

Propose git or download release zip.

```powershell
set PYTHONPATH=processing
$env:PYTHONPATH="processing"
```

```bash
# Clone or download the app codebase
git clone https://github.com/sound-scape-explorer/sound-scape-explorer.git

# 📥 Installation
cd sound-scape-explorer
pnpm i
cd front && pnpm i && cd ..

# Create your campaign with configuration file or download this example
# https://drive.google.com/drive/folders/1XyQ4thJsKoLj-OhHy2ea1A-6VpPlItnX

# Edit your configuration file
# You can use `pwd` to print your current working directory
# Link to `sse-config-importer`

# INSTALL PYTHON DEPENDENCIES
pip install -r processing/requirements.txt

# Python path on linux
export PYTHONPATH=processing

# 💽 Generate data, see list of available actions in `package.json`.
# Examples
pnpm process -c /path/to/config.xlsx -s /path/to/storage.h5

# Explain the smaller processing commands
pnpm process:config --config /path/to/config.xlsx --storage /path/to/storage.h5

# 🚀 Explore data, serve `front` at localhost:8080
pnpm dev

# Want a CSV export from your existing h5?
pnpm process:dataframe --band all --integration 60 --storage /path/to/storage.h5 --output /path/to/dataframe.csv
```

## ⚒️ Processing commands

| `pnpm` command          | Description                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `audio`                 | Serve audio files. Example: `pnpm audio /path/to/audio/folder`.                                                                       |
| `migrate:v8`            | Migrate storage file from v8 to v9.                                                                                                   |
| `process`               | alias for `process:all`                                                                                                               |
| `process:all`           | Run all processing commands                                                                                                           |
| `process:all-actions`   | Run `process:autocluster` `process:reducers` `process:indicators` `process:volumes` `process:matrices` & `process:pairings` commands. |
| `process:all-but-files` | Run all commands except `process:files` & `process:groups`.                                                                           |
| `process:all-to-groups` | Run `process:config` `process:files` & `process:groups` commands.                                                                     |
| `process:config`        | Process configuration file.                                                                                                           |
| `process:files`         | Process audio files.                                                                                                                  |
| `process:groups`        | Process integration of audio features.                                                                                                |
| `process:autocluster`   | Process autocluster from grouped audio features.                                                                                      |
| `process:reducers`      | Process reducers from grouped audio features.                                                                                         |
| `process:indicators`    | Process indicators from audio slices.                                                                                                 |
| `process:volumes`       | Process volumes from grouped audio features.                                                                                          |
| `process:matrices`      | Process matrices from grouped audio features.                                                                                         |
| `process:pairings`      | Process pairings from grouped audio features.                                                                                         |
| `process:dataframe`     | Build pandas DataFrame and export to .csv file.                                                                                       |

## 🧑‍🤝‍🧑 Contribute

Feel free to open an issue or PR if you have any questions or suggestions.
