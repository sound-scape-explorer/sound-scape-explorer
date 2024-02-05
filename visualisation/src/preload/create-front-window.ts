import {FrontBridge} from '../bridges/FrontBridge';

export async function createFrontWindow() {
  await FrontBridge.createFromRenderer();
}
