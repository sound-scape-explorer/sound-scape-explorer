import {reactive} from 'vue';

export interface SettingsStore {
  preview: boolean;
  fullPageScreenshot: boolean;
  autoOpenOnScatterClick: boolean;
}

export const settingsStore = reactive<SettingsStore>({
  preview: false,
  fullPageScreenshot: true,
  autoOpenOnScatterClick: true,
});
