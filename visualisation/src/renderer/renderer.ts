import 'sass-reset/src/reset.scss';
import './styles/main.scss';

import {LoadedZone} from './controllers/LoadedZone';
import {LoadingZone} from './controllers/LoadingZone';
import {Title} from './controllers/Title';

new Title();
const loadingZone = new LoadingZone();
const loadedZone = new LoadedZone();

export const render = async () => {
  const audioStatus = await window.electronAPI.getAudioStatus();

  if (audioStatus === false) {
    loadingZone.show();
    loadedZone.hide();
    return;
  }

  const audioPath = loadingZone.audioPath;

  loadingZone.hide();
  loadedZone.show(audioPath);
};

render().then();
