import {ipcRenderer} from 'electron';

import {Channels} from '../channels';

export async function getStoragePath(): Promise<string | null> {
  return await ipcRenderer.invoke(Channels.STORAGE_GET);
}
