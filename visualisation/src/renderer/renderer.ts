import 'sass-reset';
import './styles/main.scss';

import {LoadedZone} from './controllers/LoadedZone';
import {LoadingZone} from './controllers/LoadingZone';
import {Title} from './controllers/Title';

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const title = new Title();
const loadingZone = new LoadingZone();
const loadedZone = new LoadedZone();

export const render = async () => {
  const audioStatus = await window.electronAPI.getAudioStatus();

  if (audioStatus === false) {
    loadingZone.show();
    loadedZone.hide();
    return;
  }

  loadingZone.hide();
  loadedZone.show();
};

render().then();
