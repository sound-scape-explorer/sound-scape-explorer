export const REFS = {
  BODY: document.body,
  HEADER: document.getElementById('sse-title') as HTMLHeadingElement,
  VERSION: document.getElementById('sse-version') as HTMLParagraphElement,
  AUDIO_STATUS: document.getElementById('sse-audio-status') as HTMLSpanElement,
  VERSION_STATUS: document.getElementById(
    'sse-version-status',
  ) as HTMLSpanElement,
  CAMPAIGN_CONTAINER: document.getElementById(
    'sse-campaign-container',
  ) as HTMLDivElement,
  CAMPAIGN_BUTTON: document.getElementById(
    'sse-campaign-button',
  ) as HTMLButtonElement,
  AUDIO_CONTAINER: document.getElementById(
    'sse-audio-container',
  ) as HTMLDivElement,
  VISUALISATION_CONTAINER: document.getElementById(
    'sse-visualisation-container',
  ) as HTMLDivElement,
  VISUALISATION_BUTTON: document.getElementById(
    'sse-visualisation-button',
  ) as HTMLButtonElement,
  STATUS_CONTAINER: document.getElementById(
    'sse-status-container',
  ) as HTMLDivElement,
  AUDIO_START_BUTTON: document.getElementById(
    'sse-audio-start-button',
  ) as HTMLButtonElement,
  AUDIO_STOP_BUTTON: document.getElementById(
    'sse-audio-stop-button',
  ) as HTMLButtonElement,
  AUDIO_FILE_INPUT_CONTAINER: document.getElementById(
    'sse-audio-file-container',
  ) as HTMLLabelElement,
  AUDIO_FILE_INPUT_SPAN: document.getElementById(
    'sse-audio-file-span',
  ) as HTMLLabelElement,
  AUDIO_FILE_INPUT: document.getElementById(
    'sse-audio-file-input',
  ) as HTMLInputElement,
  AUDIO_TEXT_INPUT: document.getElementById(
    'sse-audio-text-input',
  ) as HTMLInputElement,
  AUDIO_TEXT_INPUT_SUCCESS: document.getElementById(
    'sse-audio-text-input-success',
  ) as HTMLElement,
  AUDIO_TEXT_INPUT_ERROR: document.getElementById(
    'sse-audio-text-input-error',
  ) as HTMLElement,
};

export const CLASSES = {
  DANGER: 'is-danger',
  SUCCESS: 'is-success',
  WARNING: 'is-warning',
  DARK: 'is-dark',
  WHITE: 'is-white',
  TEXT_WHITE: 'has-text-white',
  BACKGROUND_BLACK: 'has-background-black',
  BACKGROUND_DARK: 'has-background-dark',
  PLACEHOLDER_WHITE: 'sse-placeholder-white',
  FORBIDDEN: 'sse-forbidden',
};
