// noinspection ES6PreferShortImport

import {checkPath} from '../visualisation/src/preload/check-path';
import {createCampaignWindow} from '../visualisation/src/preload/create-campaign-window';
import {createFrontWindow} from '../visualisation/src/preload/create-front-window';
import {findCommonFolder} from '../visualisation/src/preload/find-common-folder';
import {getAudioPath} from '../visualisation/src/preload/get-audio-path';
import {getAudioStatus} from '../visualisation/src/preload/get-audio-status';
import {getDirectoryPath} from '../visualisation/src/preload/get-directory-path';
import {getPathExistence} from '../visualisation/src/preload/get-path-existence';
import {getStoragePath} from '../visualisation/src/preload/get-storage-path';
import {joinPath} from '../visualisation/src/preload/join-path';
import {listFiles} from '../visualisation/src/preload/list-files';
import {setStoragePath} from '../visualisation/src/preload/set-storage-path';
import {startAudioService} from '../visualisation/src/preload/start-audio-service';
import {stopAudioService} from '../visualisation/src/preload/stop-audio-service';

export interface ElectronAPI {
  getDirectoryPath: typeof getDirectoryPath;
  getPathExistence: typeof getPathExistence;
  startAudioService: typeof startAudioService;
  getAudioStatus: typeof getAudioStatus;
  getAudioPath: typeof getAudioPath;
  stopAudioService: typeof stopAudioService;
  createFrontWindow: typeof createFrontWindow;
  createCampaignWindow: typeof createCampaignWindow;
  joinPath: typeof joinPath;
  findCommonFolder: typeof findCommonFolder;
  checkPath: typeof checkPath;
  listFiles: typeof listFiles;
  getStoragePath: typeof getStoragePath;
  setStoragePath: typeof setStoragePath;
}
