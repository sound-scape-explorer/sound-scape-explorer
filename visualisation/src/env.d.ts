import {type ElectronAPI} from '@shared/electron.ts';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
