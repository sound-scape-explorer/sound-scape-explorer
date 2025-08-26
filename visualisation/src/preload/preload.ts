import {contextBridge} from 'electron';
import {getAudioPath} from 'src/preload/get-audio-path';
import {getStoragePath} from 'src/preload/get-storage-path';
import {setStoragePath} from 'src/preload/set-storage-path';

import {checkPath} from './check-path';
import {createCampaignWindow} from './create-campaign-window';
import {createFrontWindow} from './create-front-window';
import {findCommonFolder} from './find-common-folder';
import {getAudioStatus} from './get-audio-status';
import {getDirectoryPath} from './get-directory-path';
import {getPathExistence} from './get-path-existence';
import {joinPath} from './join-path';
import {listFiles} from './list-files';
import {startAudioService} from './start-audio-service';
import {stopAudioService} from './stop-audio-service';

contextBridge.exposeInMainWorld('electronAPI', {
  getDirectoryPath,
  getPathExistence,
  startAudioService,
  getAudioStatus,
  getAudioPath,
  stopAudioService,
  createFrontWindow,
  createCampaignWindow,
  joinPath,
  findCommonFolder,
  checkPath,
  listFiles,
  getStoragePath,
  setStoragePath,
});
