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
  - [Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
  - [Debian](https://docs.docker.com/engine/install/debian/)
  - [Other](https://docs.docker.com/engine/install/)
  - [Windows](https://www.docker.com/products/docker-desktop)

### ⚙️ Configure your project

Download
the [configuration example](https://github.com/sound-scape-explorer/sound-scape-explorer/raw/main/examples/common/config.xlsx)
and set up your project!

### 💽 Generate your data

#### Steps

1. Download and unzip a template from the available flavors.
2. Edit the `project.env` text file and specify requested paths and filenames.
3. Run the startup script according to your operating system.

| SSE Flavor                                                                                                              | Use case                                                                                                                                     |
|-------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| [SSE Audio](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest/download/sse-audio-docker.zip) | Use this if you already have your `.h5` and want to use the [hosted front end](https://sound-scape-explorer.github.io/sound-scape-explorer/) |
| [SSE CPU](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest/download/sse-cpu-docker.zip)     | Use this if you want to generate your `.h5` using your CPU (slower).                                                                         |
| [SSE CUDA](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest/download/sse-cuda-docker.zip)   | Use this if you want to generate your `.h5` using your GPU with CUDA acceleration (faster).                                                  |
| [SSE Front](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest/download/sse-front-docker.zip) | Use this if you already have your `.h5` and you intend to work offline by using the [local front end](http://localhost:8080)                 |
| [SSE Next](https://github.com/sound-scape-explorer/sound-scape-explorer/releases/latest/download/sse-next-docker.zip)   | Use this if you want to access to unstable versions from development branches.                                                               |

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

# Want a CSV export from your existing h5?
yarn dataframe --band all --integration 60 --storage /path/to/storage.h5 --csv /path/to/csv
```

## ⚒️ Processing commands

| `yarn` command          | Description                                                                                                                           |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
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

## 🧑‍🤝‍🧑 Contribute

Feel free to open an issue or PR if you have any questions or suggestions.
