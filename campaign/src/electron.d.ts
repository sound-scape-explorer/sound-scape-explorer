import {ElectronAPI} from '../../visualisation/src/preload/preload.ts';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
