import {reactive} from 'vue';

import {PLOT_BACKGROUND} from '../../constants';

export interface SettingsStore {
  autoOpenOnScatterClick: boolean;
  plotBackground: PLOT_BACKGROUND;
}

export const settingsStore = reactive<SettingsStore>({
  autoOpenOnScatterClick: true,
  plotBackground: PLOT_BACKGROUND.transparent,
});
