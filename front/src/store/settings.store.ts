import {reactive} from 'vue';

interface SettingsStoreInterface {
  debug: boolean;
  umap: {
    screenshot: {
      isFull: boolean;
    };
    export: {
      labels: boolean;
      timestamps: boolean;
      tags: boolean;
      meta: boolean;
      points: boolean;
      features: boolean;
    };
  };
}

export const settingsStore = reactive<SettingsStoreInterface>({
  debug: false,
  umap: {
    screenshot: {
      isFull: true,
    },
    export: {
      labels: true,
      timestamps: true,
      tags: true,
      meta: true,
      points: true,
      features: true,
    },
  },
});
