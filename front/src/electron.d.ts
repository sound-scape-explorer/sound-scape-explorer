import {ElectronAPI} from '@shared/electron';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
