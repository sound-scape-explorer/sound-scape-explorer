import {reactive} from 'vue';

export interface SettingsStore {
  preview: boolean;
  umap: {
    screenshot: {
      isFull: boolean;
    };
    export: {
      labels: boolean;
      timestamps: boolean;
      meta: boolean;
      points: boolean;
      features: boolean;
    };
  };
}

export const settingsStore = reactive<SettingsStore>({
  preview: false,
  umap: {
    screenshot: {
      isFull: true,
    },
    export: {
      labels: true,
      timestamps: true,
      meta: true,
      points: true,
      features: true,
    },
  },
});
