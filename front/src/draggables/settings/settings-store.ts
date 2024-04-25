import {PLOT_BACKGROUND} from 'src/constants';
import {reactive} from 'vue';

export interface SettingsStore {
  autoOpenOnScatterClick: boolean;
  plotBackground: PLOT_BACKGROUND;
  applyTimezone: boolean;
  preview: boolean;
}

export const settingsStore = reactive<SettingsStore>({
  autoOpenOnScatterClick: false,
  plotBackground: PLOT_BACKGROUND.transparent,
  applyTimezone: false,
  preview: false,
});
