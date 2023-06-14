<div align="center">

<img alt="logo" width="200px" src="https://i.imgur.com/ZFnumtY.png">

# [SoundScape Explorer](https://sound-scape-explorer.github.io/sound-scape-explorer/)

**Process. Visualize. Explore.**

![Version](https://img.shields.io/github/package-json/v/sound-scape-explorer/sound-scape-explorer)

</div>

---

[toc]

> **Warning**
>
> SoundScape Explorer is currently under heavy development so bugs may
> be present.

## Table of contents

- [About](#about)
- [Manual installation](#manual-installation)
- [Docker installation](#docker-installation)
- [Usage](#usage)
- [Migration](#migration)
- [Dataframe](#dataframe)

## About

Process your audio files through neural network and explore the results of your
campaign in the browser.

The application is split into 3 modules:

| Module       | Description                                                                      |
| ------------ | -------------------------------------------------------------------------------- |
| `Processing` | The actions responsible for processing your audio files.                         |
| `Front`      | The user interface running in the web browser.                                   |
| `Audio`      | The web server to provide audio files in order to play them back in the browser. |

## Manual installation

> **Note**
>
> Skip to [Docker installation](#docker-installation)
> if you intend to have basic usage of `SoundScape Explorer`.

These are the tools that are needed in order to proceed:

- [shell](#shell)
- [package manager](#package-manager)
- [git](#git)
- [python](#python)
- [nodejs](#nodejs)
- [pnpm](#pnpm)

### `shell`

In order to proceed to the manual installation of `SoundScape Explorer`,
you will interact with your system's shell.

After getting access to it, we will run commands within it
to install the required packages.

#### `shell` for Windows

Please use `PowerShell`.

#### `shell` for macOS

Please use your `Terminal`.

#### `shell` for Debian based distributions

Please use your `Terminal`.

### Package manager

Package managers are useful tools to manage installs, updates and removals of the
binaries installed on your operating system.

We recommend using them in order to have a more consistent and manageable environment.

> **Note**
>
> Those package managers handle binaries and can be compared to
> programming languages package managers such as `pip` is for Python
> and `npm` is for Node.js.

> **Warning**
>
> Please remember that multiple package managers can collide.
> It will result in a messy environment and unexpected behaviour.
>
> For instance, this can happen when managing packages with `anaconda` and `pip`.
>
> In order to have a consistent experience, decide one way
> of managing packages and stick to it!

#### Package manager for Windows

We recommend using [chocolatey](https://chocolatey.org).

Find its official [installation documentation](https://chocolatey.org/install).

#### Package manager for macOS

We recommend using [Homebrew](https://brew.sh/).

#### Package manager for Debian based distributions

You most definitely already have [APT](https://www.wikiwand.com/en/APT_%28Package_Manager%29).

### `git`

[git](https://git-scm.com/) is a source control manager. It versions files
and their content.

This developer tool will allow you to fetch the current codebase easily.

> **Note**
>
> Installing `git` is optional.
>
> Refer to [Download `SoundScape Explorer`](#download-soundscape-explorer)
> for further instructions.

Verify that `git` is correctly installed
by submitting the following command into your shell:

```bash
git --version
# git version 2.25.1
```

#### `git` for Windows

```powershell
choco install git
```

#### `git` for macOS

You should already have `git` installed.

If not, please install with the following command:

```bash
brew install git
```

#### `git` for Debian based distributions

You should already have `git` installed.

If not, please install with:

```bash
sudo apt install git
```

### `python`

You will need Python 3.8 installed on your operating system.

You will also need [pip](https://pypi.org/project/pip/),
Python's package manager in order to install the dependencies.

> **Note**
>
> Using the recommended version to ensure
> not encountering unexpected errors during the installation.

After installing Python and its package manager,
please run these commands.

```bash
python3 --version
# Python 3.8.10

pip3 --version
# pip 23.1.1 from /home/user/.local/lib/python3.8/site-packages/pip (python 3.8)
```

> **Warning**
>
> If `python3` binary is not found but `python` is, please either:
>
> - Create an alias for `python` as `python3`
> - Create a symbolic link from `python3` to `python`
> - Rename all `python3` and `pip3` instances inside `package.json` to `python` and `pip`

> **Warning**
>
> If you use `anaconda`, skip this part.
>
> Instead, create a dedicated environment within `anaconda` user interface
> then start your shell from there.

> **Note**
>
> Refer to [Testing installation](#testing-installation) for exhaustive
> testing of your installation.

#### `python` for Windows

Please run the following command to install Python:

```powershell
choco install python3 --version=3.8.10
```

#### `python` for macOS

```bash
brew install python@3.8
```

#### `python` Debian based distributions

Please install with:

```bash
sudo apt install python3.8 python3-pip
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

Please install with the following command in your shell:

```powershell
choco install nodejs --version=16.20.0
```

#### `nodejs` macOS

Please install with the following command in your shell:

```bash
brew install node@16
```

#### `nodejs` Debian based distributions

Please install by runing the following oneliner command inside your shell:

> **Note**
>
> You will need `curl` to run this command.
>
> Install with `sudo apt install curl`

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && sudo apt-get install -y nodejs
```

### `pnpm`

[pnpm](https://pnpm.io/installation#using-npm) is a
more efficient package manager than built-in
node package manager (npm).

In order to install it, please follow the instructions according
to your operating system.

After installation, please verify by running the following command
in your shell:

```bash
pnpm --version
# 8.6.0
```

#### `pnpm` for Windows

Open a new instance of powershell in **administrator**
and run the following command:

```powershell
npm -g i pnpm
```

#### `pnpm` for macOS

Run the following command inside your terminal:

```bash
sudo npm -g i pnpm
```

#### `pnpm` for Debian based distributions

Run the following command inside your terminal:

```bash
sudo npm -g i pnpm
```

### Testing installation

You can test your installation all at once or for each specific package.

#### Testing installation for Windows

TODO

#### Testing installation for macOS and Debian based distributions

Please find the following commands below.

> **Note**
>
> You can run all tests at once by using `pnpm test:install:unix`

```bash
pnpm test:git:unix

# > sound-scape-explorer@9.0.0 test:git:unix /home/user/git/sound-scape-explorer
# > bin/test-git.sh
#
# git
# Version: git version 2.25.1
# Path: /usr/bin/git

pnpm test:python:unix

# > sound-scape-explorer@9.0.0 test:python:unix /home/user/git/sound-scape-explorer
# > bin/test-python.sh
#
# python3
# Version: Python 3.8.10
# Path: /usr/bin/python3
#
# pip3
# Version: pip 23.1.1 from /home/user/.local/lib/python3.8/site-packages/pip (python 3.8)
# Path: /home/user/.local/bin/pip3

pnpm test:nodejs:unix

# > sound-scape-explorer@9.0.0 test:nodejs:unix /home/user/git/sound-scape-explorer
# > bin/test-nodejs.sh
#
# node
# Version: v16.20.0
# Path: /usr/bin/node

pnpm test:pnpm:unix

# > sound-scape-explorer@9.0.0 test:pnpm:unix /home/user/git/sound-scape-explorer
# > bin/test-pnpm.sh
#
# pnpm
# Version: 8.6.0
# Path: /usr/bin/pnpm
```

### Download `SoundScape Explorer`

You can download `SoundScape Explorer` following two methods:

- [Clone repository with `git`](#clone-repository-with-git)
- [Download release as `.zip`](#download-release-as-zip)

#### Clone repository with `git`

If you chose using `git`, you can clone the repository by
running the following command inside your shell instance:

```bash
git clone https://github.com/sound-scape-explorer/sound-scape-explorer.git --depth 1
```

#### Download release as `.zip`

If you decide to skip `git`, you will have to download one of the
[released versions](https://github.com/sound-scape-explorer/sound-scape-explorer/releases)
that comes as a `.zip` file.

If you go that way, you will need to download a new zip file
every time a new version is published.

### Modules

`SoundScape Explorer` comes in three modules.

- [Processing](#processing-module-installation)
- [Front](#front-module-installation)
- [Audio](#audio-module-installation)

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

Docker is a virtualizing tool giving users the power to
start software with its own environment bundled into **containers**.

These containers are built by the developers
thus ensuring that all necessary dependencies are shipped with
the software.

### Docker on Windows

Please follow the official documentation to run Docker
on Windows [here](https://docs.docker.com/desktop/install/windows-install/)

### Docker on macOS

Please follow the official documentation to run Docker
on macOS [here](https://docs.docker.com/desktop/install/mac-install/)

### Docker on Debian

Please follow the official documentation to run Docker
on Ubuntu [here](https://docs.docker.com/engine/install/debian/)

### Docker on Ubuntu

Please follow the official documentation to run Docker
on Ubuntu [here](https://docs.docker.com/engine/install/ubuntu/)

## Usage

- [Set up your project](#set-up-your-project)
- [Process your data](#process-your-data)
- [Explore your data](#explore-your-data)

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

Your audio files will be filtered and processed by neural network
and each second of audio will result in an array of 128 numbers.
These arrays are named **features**.

Each of these features will then be integrated according
to your configuration. This stage is called **grouping**.

Because each of these features are in 128 dimensions, they will finally
be reduced in dimensions through selected reducing algorithms.

> **Note**
>
> `UMAP` reducing algorithm is the most recommended algorithm as
> it is the most used within the community
> and development has been heavily focusing on it.

All generated data will be stored inside a `.h5` file.

This file will be fed into the `Front` later on.

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

> **Note**
>
> Use `pwd` to get the path of your
> current working directory.

##### Single step process

Manual installation gives you the control to start each process
individually.

For instance, you can only refresh the configuration file's digest
inside your `.h5` storage file with the following command:

```bash
pnpm process:config --config /path/to/config.xlsx --storage /path/to/storage.h5
```

> **Note**
>
> Find all available `pnpm` commands [here](#pnpm-commands).

#### Process your data (Docker installation)

At the moment, Docker installation only allows all processes to trigger.

> **Note**
>
> This could be improved following user needs.
>
> Please send your feedback to the development team [here](#interact-with-development-team).

Please refer to the [Docker manual](TODO)

### Explore your data

In order to explore your generated data, please refer to the two
following methods.

> **Note**
>
> If you do not intend to work offline,
> you can directly use the [Front online version](https://sound-scape-explorer.github.io/sound-scape-explorer).

#### Without audio playback

If you do not need audio playback with spectrogram features, you
can run the following command inside your shell instance:

```bash
pnpm front
```

#### With audio playback

If you need listening to your audio files inside the web browser
and display spectrograms, run the following command:

```bash
pnpm front:audio -- path/to/audio/folder
```

> **Note**
>
> If you want to launch only the `audio` module,
> use the `pnpm audio -- path/to/audio/folder`

## Migration

Because of the current sustained development,
a lot of breaking changes
happened and are expected to occur again.

In order to avoid users to regenerate all data
at each **major** version upgrade, migration scripts have been
implemented from `v8` and above.

### Example

```bash
pnpm migrate:v8 --storage /path/to/storage.h5
```

## Dataframe

If you need to generate a `.csv` file from an existing `.h5` file,
you can use the following command:

```bash
pnpm dataframe:csv --band human --integration 15 --storage /path/to/storage.h5 --csv /path/to/dataframe.csv

# or shorter
pnpm dataframe:csv -b human -i 15 -s /path/to/storage.h5 -c /path/to/dataframe.csv
```

## Docker flavors

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

## Project example

[Lana's light v9](https://drive.google.com/drive/folders/1XyQ4thJsKoLj-OhHy2ea1A-6VpPlItnX)

## Pythonpath

## Documentation TODO

```bash
# Python path on UNIX
pnpm set:path:unix

# Python path on Windows
pnpm set:path:windows
```

## `pnpm` commands

| `pnpm` command          | Description                                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `audio`                 | Serve audio files. Example: `pnpm audio -- /path/to/audio/folder`.                                                                    |
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

## Interact with development team

Feel free to open an [issue](https://github.com/sound-scape-explorer/sound-scape-explorer/issues)
or [Pull Request](https://github.com/sound-scape-explorer/sound-scape-explorer/pulls)
if you have any questions or suggestions.
