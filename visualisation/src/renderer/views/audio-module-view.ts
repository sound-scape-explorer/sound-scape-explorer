import {CLASSES, REFS} from 'src/renderer/constants';

const audioStartButton = REFS.AUDIO_START_BUTTON;
const audioStopButton = REFS.AUDIO_STOP_BUTTON;
const fileInput = REFS.AUDIO_FILE_INPUT;
const fileInputContainer = REFS.AUDIO_FILE_INPUT_CONTAINER;
const fileInputSpan = REFS.AUDIO_FILE_INPUT_SPAN;
const textInput = REFS.AUDIO_TEXT_INPUT;
const textInputSuccess = REFS.AUDIO_TEXT_INPUT_SUCCESS;
const textInputError = REFS.AUDIO_TEXT_INPUT_ERROR;

export class AudioModuleView {
  public render({isAudioRunning = false, isTextInputValid = false}) {
    if (!isTextInputValid && !isAudioRunning) {
      this.enableFileInput();
      this.renderStart();
      this.renderStop();
      this.renderInput(true);
      this.renderInputError();
      return;
    }

    if (isTextInputValid && !isAudioRunning) {
      this.enableFileInput();
      this.renderStart(true);
      this.renderStop();
      this.renderInput(true);
      this.renderInputSuccess();
      return;
    }

    if (isTextInputValid && isAudioRunning) {
      this.disableFileInput();
      this.renderStart();
      this.renderStop(true);
      this.renderInput();
      this.renderInputSuccess();
      return;
    }
  }

  private renderStart(isEnabled = false) {
    audioStartButton.disabled = !isEnabled;
  }

  private renderStop(isEnabled = false) {
    audioStopButton.disabled = !isEnabled;
  }

  private renderInput(isEnabled = false) {
    textInput.disabled = !isEnabled;
  }

  private renderInputSuccess() {
    textInputSuccess.style.display = 'flex';
    textInputError.style.display = 'none';
  }

  private renderInputError() {
    textInputSuccess.style.display = 'none';
    textInputError.style.display = 'flex';
  }

  private disableFileInput() {
    fileInput.disabled = true;
    fileInput.classList.add(CLASSES.FORBIDDEN);
    fileInputContainer.classList.add(CLASSES.FORBIDDEN);
    fileInputSpan.classList.add(CLASSES.FORBIDDEN);
  }

  private enableFileInput() {
    fileInput.disabled = false;
    fileInput.classList.remove(CLASSES.FORBIDDEN);
    fileInputContainer.classList.remove(CLASSES.FORBIDDEN);
    fileInputSpan.classList.remove(CLASSES.FORBIDDEN);
  }
}
