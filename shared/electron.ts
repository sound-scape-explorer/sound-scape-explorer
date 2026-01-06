// noinspection ES6PreferShortImport

import {checkPath} from '../visualisation/src/preload/check-path';
import {createCampaignWindow} from '../visualisation/src/preload/create-campaign-window';
import {createFrontWindow} from '../visualisation/src/preload/create-front-window';
import {findCommonFolder} from '../visualisation/src/preload/find-common-folder';
import {getAudioPath} from '../visualisation/src/preload/get-audio-path';
import {getAudioStatus} from '../visualisation/src/preload/get-audio-status';
import {getDirectoryPath} from '../visualisation/src/preload/get-directory-path';
import {getPathExistence} from '../visualisation/src/preload/get-path-existence';
import {joinPath} from '../visualisation/src/preload/join-path';
import {startAudioService} from '../visualisation/src/preload/start-audio-service';
import {stopAudioService} from '../visualisation/src/preload/stop-audio-service';

export interface ElectronAPI {
  getDirectoryPath: typeof getDirectoryPath;
  getPathExistence: typeof getPathExistence;
  startAudioService: typeof startAudioService;
  stopAudioService: typeof stopAudioService;
  getAudioPath: typeof getAudioPath;
  getAudioStatus: typeof getAudioStatus;
  createFrontWindow: typeof createFrontWindow;
  createCampaignWindow: typeof createCampaignWindow;
  joinPath: typeof joinPath;
  findCommonFolder: typeof findCommonFolder;
  checkPath: typeof checkPath;
}
