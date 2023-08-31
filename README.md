<div align="center">

<img alt="logo" width="200px" src="https://i.imgur.com/ZFnumtY.png">

# [SoundScape Explorer](https://sound-scape-explorer.github.io/sound-scape-explorer/)

**Process. Visualize. Explore.**

![Version](https://img.shields.io/github/package-json/v/sound-scape-explorer/sound-scape-explorer)

</div>

---

[toc]

## Table of contents

- [About](#about)
- [Manual installation](#manual-installation)
- [Docker installation](#docker-installation)
- [Usage](#usage)

## About

Process your audio files through neural networks and explore the results of your
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
>
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

Run this inside an administrative shell:

```powershell
choco install git -y
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
> Use the recommended version to ensure
> not encountering unexpected errors during the installation.

After installing Python and its package manager,
please run these commands:

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
> - Rename all `python3` and `pip3` instances inside `package.json` to `python`
>   and `pip`
>
> **Warning**
>
> If you use `anaconda`, skip this part.
>
> Instead, create a dedicated environment within `anaconda` user interface
> then start your shell from there.
>
> **Note**
>
> Refer to [Testing installation](#testing-installation) for exhaustive
> testing of your installation.

#### `python` for Windows

Please run the following command in an administrative shell to install Python:

```powershell
choco install python3 --version=3.8.10 -y
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

Please install with the following command in an administrative shell:

```powershell
choco install nodejs --version=16.20.0 -y
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

Please find the following commands below.

> **Note**
>
> You can run all tests at once by using `pnpm test:install:windows`

```powershell
pnpm test:git:windows

# git
# Version: git version 2.41.0.windows.1
# Path: git.exe

pnpm test:python:windows

# python
# Version: Python 3.8.10
# Path: python.exe
#
# pip
# Version: pip 21.1.1 from c:\python38\lib\site-packages\pip (python 3.8)
# Path: pip.exe

pnpm test:nodejs:windows

# node
# Version: v16.20.0
# Path: node.exe

pnpm test:pnpm:windows

# pnpm
# Version: 8.6.2
# Path: pnpm.ps1
```

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

`SoundScape Explorer` comes as three modules.

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

- [ ] TODO: Test docker installation in real conditions

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

#### Excel file

Download the [configuration template](https://github.com/sound-scape-explorer/sound-scape-explorer/raw/main/examples/common/config.xlsx)
and set up your project!

Please refer to the `Help` tab in order to get information about
how to fill this configuration file.

Tabs that you should be editing are colored in **yellow**.

#### YAML file

Once your configuration done, you will need to download the [YAML configuration
file](https://github.com/sound-scape-explorer/sound-scape-explorer/raw/main/examples/common/sse.yaml)
and specify both file paths.

### Process your data

Once your configuration file is completed and your YAML file ready, you can
start processing your audio files.

Your audio files will be filtered and processed by neural network
and each second of audio will result in an array of 128 numbers.
These arrays are named **features**.

Each of these features will then be integrated according
to your configuration. This stage is called **aggregation**.

Because each of these features are in very high dimensions, they will finally
be reduced in dimensions through selected reducing algorithms.

> **Note**
>
> `UMAP` reducing algorithm is the most recommended algorithm as
> it is the most used within the community
> and development has been heavily focused on it.

All generated data will be stored inside a `.h5` file.

This file will be fed into the `Front` later on.

Please follow the related instructions depending on the installation
method you chose above.

#### Process your data (manual installation)

Please run the following command in order to start the `Processing` module.

```bash
pnpm process path/to/sse.yaml
```

> **Note**
>
> Remember to use `pwd` to get absolute path of your current working directory.

You will get the menu below.

Use you `arrow` and `Enter` keys to navigate through it.

```bash
👋 Welcome to SoundScape Explorer!

┏━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ File    ┃ Path                                      ┃
┡━━━━━━━━━╇━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┩
│ config  │ relative/or/absolute/path/to/config.xlsx  │
│ storage │ relative/or/absolute/path/to/storage.h5   │
└─────────┴───────────────────────────────────────────┘
? Choose your action  (Use arrow keys)
 ❯ Refresh configuration
   Run extractions and aggregations
   Run reductions
   ---------------
   Run computation UMAPs and mean distances matrix (needed for autocluster)
   Purge computation UMAPs and mean distances matrix
   ---------------
   Run autoclusters
   Run trajectories
   Run digests
   ---------------
   Run all
   Export dataframe as .csv
   Repack storage with `h5repack` (UNIX only)
   ---------------
   Quit
```

##### Menu

Once the
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

- [ ] TODO: Add documentation

> **Note**
>
> This could be improved following user needs.
>
> Please send your feedback to the development team [here](#looking-for-more).

##### Enable CUDA for Docker

In order to use your GPU via CUDA with Docker, you will need
to install the NVIDIA Container Runtime.

Please install the package following [this guide](https://nvidia.github.io/nvidia-container-runtime/)

To verify that Docker is working properly with CUDA,
follow this [Docker documentation](https://docs.docker.com/config/containers/resource_constraints/#gpu)

### Explore your data

In order to explore your generated data, please refer to the following methods.

`Front` will be served at [localhost:5530](http://localhost:5530)

`Audio` will be served at [localhost:5531](http://localhost:5531)

> **Note**
>
> If you do not intend to work offline,
> you can directly use the [Front online version](https://sound-scape-explorer.github.io/sound-scape-explorer).

#### Without audio playback

If you do not need audio playback with spectrogram features, you
can run the [`front` command](#front-command) inside your shell instance.

#### With audio playback

If you need listening to your audio files inside the web browser
and display spectrograms, run the [`front:audio` command](#frontaudio-command).

> **Note**
>
> If you only want to serve the `Audio` module,
> use the [`audio` command](#audio-command)

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
| SSE Front  | Use this if you already have your `.h5` and intend to work offline by using the [offline front end](http://localhost:5530).                   |

## Project example

[Coral reef light](https://github.com/sound-scape-explorer/sound-scape-explorer/main/examples/coral-reef-light/)

## `pnpm` commands

There are three main groups of `pnpm` commands:

- [`Audio` module commands](#audio-module-commands)
- [`Front` module commands](#front-module-commands)
- [`Processing` module commands](#processing-module-commands)

### `Audio` module commands

#### `audio` command

Serve `Audio` module on port [5531](http://localhost:5531)

```bash
pnpm audio -- /path/to/audio/folder
```

### `Front` module commands

#### `front` command

Serve `Front` module on port [5530](http://localhost:5530)

```bash
pnpm front
```

#### `front:audio` command

You can serve both `Front` and `Audio` modules at the same time

```bash
pnpm front:audio -- /path/to/audio/folder
```

### `Processing` module menu

All `pnpm` commands relative to this module are preceded with `process:`.

#### Available commands

- [Refresh configuration](#refresh-configuration-command)
- [Run extractions and aggregations](#run-extractions-and-aggregations-command)
- [Run reductions](#run-reductions-command)
- [Run computation UMAPs and mean distances matrix](#run-computation-umaps-and-mean-distances-matrix-command)
- [Purge computation UMAPs and mean distances matrix](#purge-computation-umaps-and-mean-distances-matrix-command)
- [Run autoclusters](#run-autoclusters-command)
- [Run trajectories](#run-trajectories-command)
- [Run digests](#run-digests-command)
- [Run all](#run-all-command)
- [Export dataframe](#export-dataframe-command)
- [Repack storage](#repack-storage-command)
- [Quit](#quit-command)

#### Refresh configuration command

Digest your Excel configuration file and copy all its information inside
your storage file.

> **Note**
>
> You will need to run this again if you change your configuration file.

#### Run extractions and aggregations command

Extract data from your audio files either through neural networks or indicators algorithms.

Take the raw data and aggregate them using your integration settings.

> **Note**
>
> These raw data can optionally be stored with the `persist` option.

#### Run reductions command

Take the aggregated data produced by neural networks and reduce them using your
reducers settings.

#### Run computation UMAPs and mean distances matrix command

Run the necessary data for autoclusters to be performed.

Those data will never be read in the `Front` so you can use the following
command to remove it from your storage file.

#### Purge computation UMAPs and mean distances matrix command

Remove computation data from your storage file as it will not be consumed by
the `Front`.

#### Run autoclusters command

Automatically attribute numerical clusters (groups) of intervals that are
related together depending on your settings.

These clusters will appear in the `Front` as standard labels.

#### Run trajectories command

Compute the coordinates of the requested trajectories.

#### Run digests command

Take aggregated data and produce derived data using digesters algorithms.

#### Run all command

Run all the commands necessary for a complete campaign.

#### Export dataframe command

If you need to generate a `.csv` file from an existing `.h5` file,
you can use the following command:

#### Repack storage command

When you overwrite a lot to your storage file, the space that was occupied
by the deleted dataset is not immediately freed. This is due to how the
HDF5 technology works.

Repacking allows you to create a new file with your data but with the smallest
possible size.

> **Note**
>
> This command is only available on UNIX systems at the moment.
> On Debian based distributions, install it with
>
> ```bash
> sudo apt install hdf5-tools
> ```

#### Quit command

When the `Processing` module is running, your storage file is kept open thus
not available to other programs to reading from it.

Use this to properly close and release your storage file.

## Looking for more?

Feel free to open an [issue](https://github.com/sound-scape-explorer/sound-scape-explorer/issues)
or [Pull Request](https://github.com/sound-scape-explorer/sound-scape-explorer/pulls)
if you have any questions or suggestions.
