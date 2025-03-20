import {CampaignBridge} from '../bridges/CampaignBridge';

export async function createCampaignWindow() {
  await CampaignBridge.createFromRenderer();
}
