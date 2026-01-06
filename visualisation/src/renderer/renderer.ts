import './styles/main-new.scss';

import {AudioModuleController} from 'src/renderer/controllers/audio-module-controller';
import {CampaignModuleController} from 'src/renderer/controllers/campaign-module-controller';
import {IconsController} from 'src/renderer/controllers/icons-controller';
import {PageController} from 'src/renderer/controllers/page-controller';
import {ThemeController} from 'src/renderer/controllers/theme-controller';
import {VersionStatusController} from 'src/renderer/controllers/version-status-controller';
import {VisualisationModuleController} from 'src/renderer/controllers/visualisation-module-controller';

const controllers = {
  icons: new IconsController(),
  theme: new ThemeController(),
  page: new PageController(),
  campaignModule: new CampaignModuleController(),
  audioModule: new AudioModuleController(),
  visualisationModule: new VisualisationModuleController(),
  versionStatus: new VersionStatusController(),
};

document.addEventListener('DOMContentLoaded', async () => {
  controllers.icons.render();
  controllers.page.render();
  controllers.theme.render();
  controllers.campaignModule.render();
  await controllers.versionStatus.render();
  await controllers.audioModule.render();
});
