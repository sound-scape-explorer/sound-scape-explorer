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

- Import your audio files
- Specify your project settings through shareable `.xlsx` configuration
- Extract features using machine learning processing
- Visualize results in your web browser
- Explore your data with graphical tools such as UMAP projections
- Analyze your data through metrics, statistics, filters...

## 👨‍🏫 For researchers

### ⚓ Requirements

- Install and run Docker.
  - Linux
    - [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
    - [Debian](https://docs.docker.com/engine/install/debian/)
    - [Other](https://docs.docker.com/engine/install/)
  - Windows
    - Install and run [Docker Desktop](https://www.docker.com/products/docker-desktop)

### 💽 Generate your data

Choose your project example, download and unzip then follow instructions in `README.md`

| Docker flavors                  | CPU versions                                                                                                          |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| SSE CPU                         | [SSE CPU](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest/download/sse-cpu-docker.zip)   |
| SSE CUDA                        | [SSE CUDA](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest/download/sse-cuda-docker.zip) |
| SSE Web                         | [SSE Web](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest/download/sse-web-docker.zip)   |
| SSE Next (Development versions) | [SSE Next](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest/download/sse-next-docker.zip) |

### 🚀 Explore your data

Browse to [front](https://github.io) and load your data.

## 👨‍💻 For programmers

### ⚓ Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Python 3.8+](https://www.python.org/downloads/)

### 🎛️ Instructions

```bash
# 📥 Installation
git clone git@github.com:sound-scape-explorer/sound-scape-explorer.git
cd sound-scape-explorer
yarn install

# 💽 Generate data, see list of available actions in `package.json`.
# Examples
yarn process -c /path/to/config.xlsx -s /path/to/storage.h5
yarn process:config --config /path/to/config.xlsx --storage /path/to/storage.h5

# 🚀 Explore data, serve `front` localhost:8080
yarn dev
```

## ⚒️ Processing commands

| `yarn` command          | Description                                                               |
|-------------------------|---------------------------------------------------------------------------|
| `process`               | alias for `process:all`                                                   |
| `process:all`           | Run all processing commands                                               |
| `process:all-actions`   | Run `process:indicators` `process:reducers` & `process:volumes` commands. |
| `process:all-to-groups` | Run `process:config` `process:files` & `process:groups` commands.         |
| `process:config`        | Process configuration file.                                               |
| `process:files`         | Process audio files.                                                      |
| `process:groups`        | Process integration of audio features.                                    |
| `process:indicators`    | Process indicators from audio slices.                                     |
| `process:reducers`      | Process reducers from audio features.                                     |
| `process:volumes`       | Process volumes from audio features.                                      |

## 🧑‍🤝‍🧑 Contribute

Feel free to open an issue or PR if you have any questions or suggestions.
