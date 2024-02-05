import {FrontBridge} from '../bridges/FrontBridge';
import {StorageBridge} from '../bridges/StorageBridge';

export async function createFrontWindow() {
  const storagePath = await StorageBridge.getFromRenderer();
  await FrontBridge.createFromRenderer(storagePath);
}
