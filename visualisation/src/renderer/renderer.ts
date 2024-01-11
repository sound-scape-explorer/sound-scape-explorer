import 'sass-reset';
import './styles/main.scss';

import {DropZone} from './controllers/DropZone';
import {LoadedZone} from './controllers/LoadedZone';
import {Title} from './controllers/Title';

new Title();
const dropZone = new DropZone();
const loadedZone = new LoadedZone();

export const render = async () => {
  const audioStatus = await window.electronAPI.getAudioStatus();

  if (audioStatus === true) {
    dropZone.hide();
    loadedZone.show();
    return;
  }

  dropZone.show();
  loadedZone.hide();
};

render().then();
