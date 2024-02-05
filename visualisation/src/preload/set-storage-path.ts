import {StorageBridge} from '../bridges/StorageBridge';

export async function setStoragePath(storagePath: string) {
  await StorageBridge.setFromRenderer(storagePath);
}
