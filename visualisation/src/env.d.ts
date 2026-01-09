import {type ElectronAPI} from '@shared/electron';

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }

  interface File {
    path: string;
  }
}
