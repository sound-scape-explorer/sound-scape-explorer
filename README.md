<div align="center">

<img alt="logo" width="200px" src="https://i.imgur.com/ZFnumtY.png">

# [SoundScape Explorer](https://sound-scape-explorer.github.io/sound-scape-explorer/)

**Process. Visualize. Explore.**

![Version](https://img.shields.io/github/package-json/v/sound-scape-explorer/sound-scape-explorer)

</div>

---

[toc]

## About

Process your audio files through neural network and explore the results of your
campaign in the browser.

> **Warning**: SoundScape Explorer is currently under development so bugs may
> be present.

The application is split in 3 modules:
| | Description |
| ------------ | --------------- |
| `Processing` | Responsible for processing your audio files. |
| `Front` | The user interfaces running in the web browser. |
| `Audio` | The web server to provide audio files in order to play them back in the browser. |

## Getting started

There are two ways of installing `SoundScape Explorer`.

- Manual installation
  - This is the harder way but gives you more control
    over what you can do.
- Docker installation
  - This is the easiest path to get things up and running.

## Manual installation

> **Note**: Skip to `Docker` section if you do not intend to go through
> the manual installation.

### `shell`

In order to proceed to the manual installation of `SoundScape Explorer`,
you will interact with your system's shell.

After getting access to your operating system's shell,
we will verify that the required packages are ready
to be used in order to continue the installation.

#### `shell` Windows

Please use `PowerShell`.

#### `shell` MacOS

Please use your `Terminal`.

#### `shell` Debian based distributions

Please use your `Terminal`.

### `git`

`git` is a source control manager. This developer tool allow
you to have the exact same copy of the current codebase.

> **Note**: You can skip `git` if you would rather download
> [released versions](https://placeholder) as zip files.
>
> If you go that way, you will need to download a new zip file
> every time a new version is published.

Verify that `git` is correctly installed
by submitting the following command into your shell:

```bash
git --version
# git version 2.25.1
```

#### `git` Windows

Install with [Git Bash](https://placeholder)

#### `git` MacOS

You should already have `git` installed.

If not, please install with [Homebrew](https://placeholder) package manager.

#### `git` Debian based distributions

You should already have `git` installed.

If not, please install with:

```bash
sudo apt install git
```

### `python`

You will need Python 3.8 installed on your operating system.

You will also need `pip`, Python's package manager in
order to install the dependencies.

> **Note**: Using the recommended version will ensure
> not encountering problems during installation of dependencies.

After installation Python and its package manager,
please enter this command into your shell.

```bash
python3 --version
# Python 3.8.10
```

> **Warning**: If `python3` binary is not found but `python` is, please either:
>
> - Create an alias for `python` as `python3`
> - Create a symbolic link from `python3` to `python`
> - Rename all `python3` instance inside `package.json` to `python`
>
> You can test your version on UNIX operating systems
> by running the following command `pnpm test:python`

#### `python` Windows

> **Note**: If you have `conda`, please create a dedicated
> environment accordingly
> and start your shell from there.

We recommend using [chocolatey](https://placeholder) package manager.

TODO: Verify this fucking command

```powershell
choco install python3
```

#### `python` MacOS

> **Note**: If you have `conda`, please create a dedicated environment accordingly
> and start your shell from there.

We recommend using [Homebrew](https://placeholder) package manger.

TODO: Verify this fucking command

```bash
brew install
```

#### `python` Debian based distributions

Please install with:

```bash
sudo apt install python3 python3-pip
```

### `nodejs`

You will need [Node.js](https://nodejs.org/en/)
version 16 or above in order to use `SoundScape Explorer`.

After the installation of Node.js,
please enter this command into your shell.

```bash
node --version
# v16.20.0
```

#### `nodejs` Windows

We recommend using [chocolatey](https://placeholder) package manager.

Please install with the following command in your shell:

TODO: Verify this fucking command

```powershell
choco install nodejs16
```

#### `nodejs` MacOS

We recommend using [Homebrew](https://placeholder) package manager.

Please install with the following command in your shell:

TODO: Verify this fucking command.

```bash
brew install nodejs16
```

#### `nodejs` Debian based distributions

Please install by runing the following oneliner command inside your shell:

> **Note**: You will need `curl` to be installed on your operating system.
>
> Install with `sudo apt install curl`

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && sudo apt-get install -y nodejs
```

### `pnpm`

[pnpm](https://pnpm.io/installation#using-npm) is a
more efficient package manager that the built-in
node package manager (npm).

In order to install it, please follow the instructions according
to your operating system.

After installation, please verify by running the following command
in your shell:

```bash
pnpm --version
# 8.6.0
```

#### `pnpm` Windows

Open a new instance of powershell in **administrator**
and run the following command:

```powershell
npm -g i pnpm
```

#### `pnpm` MacOS

Run the following command inside your terminal:

```bash
sudo npm -g i pnpm
```

#### `pnpm` Debian based distributions

Run the following command inside your terminal:

```bash
sudo npm -g i pnpm
```

### Download `SoundScape Explorer`

If you choose to use `git`, you can clone the repository by
submitting the following command inside your shell instance:

```bash
git clone https://github.com/sound-scape-explorer/sound-scape-explorer.git --depth 1
```

### Modules

`SoundScape Explorer` comes in three modules.

- Processing
- Audio
- Front

> **Note**: If you succesfully installed all required packages
> and want to install all modules at once,
> please run `pnpm install:all`

#### `Processing` module installation

This module is responsible for processing your audio files
according to your Excel configuration.

```bash
pnpm install:processing
```

#### `Front` module installation

This module is responsible for drawing the user interfaces
inside the web browser.

> **Note**: You can skip this step if you intend to work
> online and do not need audio playback with spectrogram feature.

Installation steps are the same and do not depend
on your operating system.

```bash
pnpm install:front
```

#### `Audio` module installation

> **Note**: You can skip this step if you intend to work
> online and do not need audio playback with spectrogram feature.

Installation steps are the same and do not depend
on your operating system.

```bash
pnpm install:audio
```

## Docker installation

Docker is virtualizing tool that gives users the power to
start apps bundled into **containers**.

These containers are created and shipped by the developers
and ensure that all necessary dependencies are shipped with
the software.

### Docker on Windows

Please follow the official documentation to run Docker
on Windows [here](https://www.docker.com/products/docker-desktop)

### Docker on MacOS

Please follow the official documentation to run Docker
on MacOS [here](https://placeholder)

### Docker on Debian

Please follow the official documentation to run Docker
on Ubuntu [here](https://docs.docker.com/engine/install/debian/)

### Docker on Ubuntu

Please follow the official documentation to run Docker
on Ubuntu [here](https://docs.docker.com/engine/install/ubuntu/)

## Usage

### Set up your project

Download the [configuration template](https://github.com/sound-scape-explorer/sound-scape-explorer/raw/main/examples/common/config.xlsx)
and set up your project!

Please refer to the `Help` tab in order to get information about
how to fill this configuration file.

Tabs that you should be editing are colored in yellow.

The following tabs are mandatory in order to process your audio files:

- Settings
- Files
- Bands
- Integrations
- Ranges
- Reducers

### Process your data

Once your configuration file is completed, you can start
processing your audio files.

Your audio files will be filtered by neural network and will result
in **features**.

Each of these features will then be integrated according
to your configuration.

Because each of these features are in 128 dimensions, they will finally
be reduced through selected reducing algorithm.

> **Note**: `UMAP` reducing algorithm is recommended as
> it is the most used in the community and development has had
> heavy focus on it.

All generated data will be stored inside a `h5` file.

This will allow to feed the front with later on.

Please follow the related instructions depending on the installation
method you chose above.

#### Process your data (manual installation)

Please run the following command in order to start all processing steps
according to your Excel configuration file.

```bash
pnpm process --config /path/to/config.xlsx --storage /path/to/storage.h5

# or shorter
pnpm process -c /path/to/config.xlsx -s /path/to/storage.h5
```

> **Note**: Use `pwd` to get the path of your
> current working directory.

##### Single step process

Manual installation gives you the control to start each process
individually.

For instance, you can only refresh the configuration file's digest
inside your `h5` storage file with the following command:

```bash
pnpm process:config --config /path/to/config.xlsx --storage /path/to/storage.h5
```

#### Process your data (docker installation)

At the moment, Docker installation only allows all processes to trigger.

> **Note**: This could be improved following user needs.
>
> Please send your feedback to the development team [here](https://placeholder)

Please refer to the [Docker manual](https://placeholder)

### Explore your data

In order to explore your generated data, please refer to the two
following methods.

#### Without audio playback

If you do not need audio playback with spectrogram features, you
can run the following command inside your shell instance:

```bash
pnpm front
```

#### With audio playback

If you want to listen to your audio files inside the web browser
and display spectrograms, run the following command:

```bash
pnpm front:audio -- path/to/audio/folder
```

> **Note**: If you want to launch only the `audio` module,
> use the `pnpm audio -- path/to/audio/folder`

---

- Set up your project with shareable `.xlsx` configuration.
- Extract data from your audio files to shareable `.h5` file.
- Visualize data in your web browser [online](https://sound-scape-explorer.github.io/sound-scape-explorer/)
  or [offline](http://localhost:8080).

> If you already have your `.h5` file and only want to visualize
> your data with no audio playback, you can directly use
> the [online front end](https://sound-scape-explorer.github.io/sound-scape-explorer/).

## Migration

Because of current sustained development, a lot of breaking changes
happened and are expected to occur again.

In order to avoid users to regenerate all their data
at each **major** version upgrade, migration scripts have been
implemented from `v8` and above.

### Example

```bash
pnpm migrate:v8 --storage /path/to/storage.h5
```

## Dataframe

If you need to generate a `csv` file from an existing `h5` file,
you can use the following command:

```bash
pnpm dataframe:csv --band human --integration 15 --storage /path/to/storage.h5 --csv /path/to/dataframe.csv

# or shorter
pnpm dataframe:csv -b human -i 15 -s /path/to/storage.h5 -c /path/to/dataframe.csv
```

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

## ⚒️ `pnpm` commands

| `pnpm` command          | Description                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `audio`                 | Serve audio files. Example: `pnpm audio -- /path/to/audio/folder`.                                                                       |
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
