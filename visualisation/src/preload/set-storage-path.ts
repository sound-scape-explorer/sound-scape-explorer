import {ipcRenderer} from 'electron';

import {Channels} from '../channels';

export async function setStoragePath(path: string) {
  await ipcRenderer.invoke(Channels.STORAGE_SET, path);
}
