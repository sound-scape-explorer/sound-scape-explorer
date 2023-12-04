import {reactive} from 'vue';

export interface SettingsStore {
  autoOpenOnScatterClick: boolean;
}

export const settingsStore = reactive<SettingsStore>({
  autoOpenOnScatterClick: true,
});
