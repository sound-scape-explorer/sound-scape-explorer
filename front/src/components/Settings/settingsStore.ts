import {reactive} from 'vue';

export interface SettingsStore {
  preview: boolean;
  umap: {
    screenshot: {
      isFull: boolean;
    };
  };
}

export const settingsStore = reactive<SettingsStore>({
  preview: false,
  umap: {
    screenshot: {
      isFull: true,
    },
  },
});
