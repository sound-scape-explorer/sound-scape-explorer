import {ipcRenderer} from 'electron';

import {Channels} from '../channels';

// todo: this is actually not really used
export async function setStoragePath(path: string) {
  await ipcRenderer.invoke(Channels.STORAGE_SET, path);
}
