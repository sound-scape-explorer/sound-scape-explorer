// noinspection ES6PreferShortImport

import {
  getDirectoryPath,
} from '../visualisation/src/preload/get-directory-path'
import {
  getPathExistence,
} from '../visualisation/src/preload/get-path-existence'
import {
  startAudioService,
} from '../visualisation/src/preload/start-audio-service'
import {getAudioStatus} from '../visualisation/src/preload/get-audio-status'
import {
  stopAudioService,
} from '../visualisation/src/preload/stop-audio-service'
import {
  createFrontWindow,
} from '../visualisation/src/preload/create-front-window'
import {
  createCampaignWindow,
} from '../visualisation/src/preload/create-campaign-window'
import {joinPath} from '../visualisation/src/preload/join-path'
import {
  findCommonFolder,
} from '../visualisation/src/preload/find-common-folder'
import {checkPath} from '../visualisation/src/preload/check-path'
import {listFiles} from '../visualisation/src/preload/list-files'

export interface ElectronAPI {
  getDirectoryPath: typeof getDirectoryPath;
  getPathExistence: typeof getPathExistence;
  startAudioService: typeof startAudioService;
  getAudioStatus: typeof getAudioStatus;
  stopAudioService: typeof stopAudioService;
  createFrontWindow: typeof createFrontWindow;
  createCampaignWindow: typeof createCampaignWindow;
  joinPath: typeof joinPath;
  findCommonFolder: typeof findCommonFolder;
  checkPath: typeof checkPath;
  listFiles: typeof listFiles;
}

