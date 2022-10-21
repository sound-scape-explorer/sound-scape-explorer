<img alt="logo" width="80px" src="https://i.imgur.com/ZFnumtY.png">

Sound Scape Explorer

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

## 📖 Instructions

### 📦 Installation

- Clone the repository
- Paste your data in the `sample` folder
  - _TODO: Rename to `data` ?_
- Run `yarn install`
- Run `yarn dev`

### 🐋 Docker

If you have Docker installed and do not want to install manually the project dependencies, you can use the following
command to run the app:

```bash
docker-compose up -d
```

### 📝 Usage

- Browse the frontend at [localhost:8080](http://localhost:8080)
- Access the backend at [localhost:8081](http://localhost:8081)
- Legacy backend is available at [localhost:9876](http://localhost:9876)

### Development instructions

#### Ports

- [Front](http://localhost:8080) `8080`
- [Back](http://localhost:8081) `8081`
- [Legacy](http://localhost:9876) `9876`

## 🧑‍🤝‍🧑 Contributions

Feel free to open an issue or PR if you have any questions or suggestions.

## ☑️ TODO

- [ ] Rename `sample` to `data` folder
- [ ] Rename `scripts` to third source folder for processing audio files
- [ ] Make the repository public
