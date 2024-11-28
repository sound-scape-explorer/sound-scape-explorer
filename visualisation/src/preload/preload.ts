import {contextBridge} from 'electron';
import {createCampaignWindow} from 'src/preload/create-campaign-window';
import {getPathExistence} from 'src/preload/get-path-existence';

import {createFrontWindow} from './create-front-window';
import {getAudioStatus} from './get-audio-status';
import {getFileDirectory} from './get-file-directory';
import {joinPath} from './join-path';
import {startAudioService} from './start-audio-service';
import {stopAudioService} from './stop-audio-service';

export interface ElectronAPI {
  getFileDirectory: typeof getFileDirectory;
  getPathExistence: typeof getPathExistence;
  startAudioService: typeof startAudioService;
  getAudioStatus: typeof getAudioStatus;
  stopAudioService: typeof stopAudioService;
  createFrontWindow: typeof createFrontWindow;
  createCampaignWindow: typeof createCampaignWindow;
  joinPath: typeof joinPath;
}

contextBridge.exposeInMainWorld('electronAPI', {
  getFileDirectory: getFileDirectory,
  getPathExistence: getPathExistence,
  startAudioService: startAudioService,
  getAudioStatus: getAudioStatus,
  stopAudioService: stopAudioService,
  createFrontWindow: createFrontWindow,
  createCampaignWindow: createCampaignWindow,
  joinPath: joinPath,
});
