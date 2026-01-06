import {ConfigDto} from '@shared/dtos';
import {ConfigPath} from '@shared/path-registry';
import * as h5 from 'jsfive';
import {CLASSES, REFS} from 'src/renderer/constants';
import {AudioModuleView} from 'src/renderer/views/audio-module-view';
import {AudioStatusView} from 'src/renderer/views/audio-status-view';
import {VisualisationView} from 'src/renderer/views/visualisation-view';

const startButton = REFS.AUDIO_START_BUTTON;
const stopButton = REFS.AUDIO_STOP_BUTTON;
const fileContainer = REFS.AUDIO_FILE_INPUT_CONTAINER;
const fileSpan = REFS.AUDIO_FILE_INPUT_SPAN;
const fileInput = REFS.AUDIO_FILE_INPUT;
const textInput = REFS.AUDIO_TEXT_INPUT;

export class AudioModuleController {
  private audioView: AudioModuleView;

  private statusView: AudioStatusView;

  private visualisationView: VisualisationView;

  public constructor() {
    this.audioView = new AudioModuleView();
    this.statusView = new AudioStatusView();
    this.visualisationView = new VisualisationView();

    this.addEventListeners();
    this.renderFirst().then();
  }

  public async render() {
    const isAudioRunning = await window.electronAPI.getAudioStatus();
    const isTextInputValid = window.electronAPI.getPathExistence(
      textInput.value,
    );

    this.audioView.render({isAudioRunning, isTextInputValid});
    this.statusView.render({isAudioRunning});
    this.visualisationView.render({isAudioRunning});
  }

  private async renderFirst() {
    const isAudioRunning = await window.electronAPI.getAudioStatus();

    if (isAudioRunning) {
      const audioPath = await window.electronAPI.getAudioPath();
      textInput.value = audioPath;
      await this.render();
    }
  }

  private addEventListeners() {
    startButton.addEventListener(
      'click',
      this.handleStartButtonClick.bind(this),
    );

    stopButton.addEventListener('click', this.handleStopButtonClick.bind(this));
    fileInput.addEventListener('change', this.handleFileInputChange.bind(this));
    textInput.addEventListener('input', this.render.bind(this));
  }

  private async handleStartButtonClick() {
    await window.electronAPI.startAudioService(textInput.value);
    await this.render();
  }

  private async handleStopButtonClick() {
    await window.electronAPI.stopAudioService();
    await this.render();
  }

  private async handleFileInputChange(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const files = input.files;

    if (files.length !== 1) {
      alert('Please add only one file');
      return;
    }

    const file = files[0];
    const extension = file.name.split('.').pop();
    const isJson = extension === 'json';
    const isH5 = extension === 'h5';

    try {
      if (isJson) {
        const reader = new FileReader();

        reader.addEventListener('load', async (e) => {
          const text = e.target.result as string;
          const parsed = JSON.parse(text);
          const dto = ConfigDto.parse(parsed);
          const audioPath = dto.settings.audioPath;
          textInput.value = audioPath;
          await this.render();
        });

        reader.readAsText(file);
      } else if (isH5) {
        const reader = new FileReader();

        reader.addEventListener('load', async (e) => {
          const data = e.target.result as ArrayBuffer;
          const f = new h5.File(data, 'r');
          const path = ConfigPath.config;
          const dataset = f.get(path);
          const configString = dataset.value[0] as string;
          const json = JSON.parse(configString);
          const config = ConfigDto.parse(json);
          const audioPath = config.settings.audioPath;
          textInput.value = audioPath;
          await this.render();
        });

        reader.readAsArrayBuffer(file);
      }
    } catch (err) {
      console.error(err);
    }
  }

  private renderFileInput(toLock = false) {
    if (toLock) {
      fileInput.disabled = true;
      fileContainer.classList.add(CLASSES.FORBIDDEN);
      fileSpan.classList.add(CLASSES.FORBIDDEN);
      return;
    }

    fileInput.disabled = false;
    fileContainer.classList.remove(CLASSES.FORBIDDEN);
    fileSpan.classList.remove(CLASSES.FORBIDDEN);
  }

  private renderTextInput(toLock = false) {
    if (toLock) {
      textInput.disabled = true;
      return;
    }

    textInput.disabled = false;
  }
}
