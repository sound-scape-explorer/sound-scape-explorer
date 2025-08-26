import {CLASSES, REFS} from 'src/renderer/constants';

const body = REFS.BODY;
const header = REFS.HEADER;
const version = REFS.VERSION;
const _campaign = REFS.CAMPAIGN_CONTAINER;
const _audio = REFS.AUDIO_CONTAINER;
const _visualisation = REFS.VISUALISATION_CONTAINER;
const _status = REFS.STATUS_CONTAINER;

const campaign = {
  container: _campaign,
  title: _campaign.children[0],
  button: _campaign.children[1].children[0],
};

const audio = {
  container: _audio,
  title: _audio.children[0],
  fileTitle: _audio.children[1].children[0],
  textTitle: _audio.children[2].children[0],
  fileInput: _audio.children[1].children[1],
  textInput: _audio.children[2].children[1].children[0],
};

const visualisation = {
  container: _visualisation,
  title: _visualisation.children[0],
  button: _visualisation.children[1].children[0],
};

const status = {
  container: _status,
  title: _status.children[0],
  versionTitle: _status.children[1].children[0],
  audioTitle: _status.children[2].children[0],
};

export class ThemeView {
  public darken() {
    // body
    body.classList.add(CLASSES.BACKGROUND_DARK);

    // header
    header.classList.add(CLASSES.TEXT_WHITE);
    version.classList.add(CLASSES.TEXT_WHITE);

    // campaign
    campaign.container.classList.add(CLASSES.BACKGROUND_BLACK);
    campaign.title.classList.add(CLASSES.TEXT_WHITE);
    campaign.button.classList.remove(CLASSES.DARK);
    campaign.button.classList.add(CLASSES.WHITE);

    // audio
    audio.container.classList.add(CLASSES.BACKGROUND_BLACK);
    audio.title.classList.add(CLASSES.TEXT_WHITE);
    audio.fileTitle.classList.add(CLASSES.TEXT_WHITE);
    audio.fileInput.classList.add(CLASSES.TEXT_WHITE);
    audio.textTitle.classList.add(CLASSES.TEXT_WHITE);
    audio.textInput.classList.add(CLASSES.BACKGROUND_BLACK);
    audio.textInput.classList.add(CLASSES.PLACEHOLDER_WHITE);

    // visualisation
    visualisation.container.classList.add(CLASSES.BACKGROUND_BLACK);
    visualisation.title.classList.add(CLASSES.TEXT_WHITE);
    visualisation.button.classList.remove(CLASSES.DARK);
    visualisation.button.classList.add(CLASSES.WHITE);

    // status
    status.container.classList.add(CLASSES.BACKGROUND_BLACK);
    status.title.classList.add(CLASSES.TEXT_WHITE);
    status.versionTitle.classList.add(CLASSES.TEXT_WHITE);
    status.audioTitle.classList.add(CLASSES.TEXT_WHITE);
  }

  public lighten() {
    // body
    body.classList.remove(CLASSES.BACKGROUND_DARK);

    // header
    header.classList.remove(CLASSES.TEXT_WHITE);
    version.classList.remove(CLASSES.TEXT_WHITE);

    // campaign
    campaign.container.classList.remove(CLASSES.BACKGROUND_BLACK);
    campaign.title.classList.remove(CLASSES.TEXT_WHITE);
    campaign.button.classList.add(CLASSES.DARK);
    campaign.button.classList.remove(CLASSES.WHITE);

    // audio
    audio.container.classList.remove(CLASSES.BACKGROUND_BLACK);
    audio.title.classList.remove(CLASSES.TEXT_WHITE);
    audio.fileTitle.classList.remove(CLASSES.TEXT_WHITE);
    audio.fileInput.classList.remove(CLASSES.TEXT_WHITE);
    audio.textTitle.classList.remove(CLASSES.TEXT_WHITE);
    audio.textInput.classList.remove(CLASSES.BACKGROUND_BLACK);
    audio.textInput.classList.remove(CLASSES.PLACEHOLDER_WHITE);

    // visualisation
    visualisation.container.classList.remove(CLASSES.BACKGROUND_BLACK);
    visualisation.title.classList.remove(CLASSES.TEXT_WHITE);
    visualisation.button.classList.add(CLASSES.DARK);
    visualisation.button.classList.remove(CLASSES.WHITE);

    // status
    status.container.classList.remove(CLASSES.BACKGROUND_BLACK);
    status.title.classList.remove(CLASSES.TEXT_WHITE);
    status.versionTitle.classList.remove(CLASSES.TEXT_WHITE);
    status.audioTitle.classList.remove(CLASSES.TEXT_WHITE);
  }
}
