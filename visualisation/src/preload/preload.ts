import {contextBridge} from 'electron';

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
  getDirectoryPath: getDirectoryPath,
  getPathExistence: getPathExistence,
  startAudioService: startAudioService,
  getAudioStatus: getAudioStatus,
  stopAudioService: stopAudioService,
  createFrontWindow: createFrontWindow,
  createCampaignWindow: createCampaignWindow,
  joinPath: joinPath,
  findCommonFolder: findCommonFolder,
  checkPath: checkPath,
  listFiles: listFiles,
});
