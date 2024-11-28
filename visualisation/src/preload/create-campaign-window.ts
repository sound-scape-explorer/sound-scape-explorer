import {CampaignBridge} from 'src/bridges/CampaignBridge';

export async function createCampaignWindow() {
  await CampaignBridge.createFromRenderer();
}
