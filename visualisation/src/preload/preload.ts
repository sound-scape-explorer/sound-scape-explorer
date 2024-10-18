import {contextBridge} from 'electron';

import {createFrontWindow} from './create-front-window';
import {getAudioStatus} from './get-audio-status';
import {getFileDirectory} from './get-file-directory';
import {joinPath} from './join-path';
import {startAudioService} from './start-audio-service';
import {stopAudioService} from './stop-audio-service';

export interface ElectronAPI {
  getFileDirectory: typeof getFileDirectory;
  startAudioService: typeof startAudioService;
  getAudioStatus: typeof getAudioStatus;
  stopAudioService: typeof stopAudioService;
  createFrontWindow: typeof createFrontWindow;
  joinPath: typeof joinPath;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

contextBridge.exposeInMainWorld('electronAPI', {
  getFileDirectory: getFileDirectory,
  startAudioService: startAudioService,
  getAudioStatus: getAudioStatus,
  stopAudioService: stopAudioService,
  createFrontWindow: createFrontWindow,
  joinPath: joinPath,
});
