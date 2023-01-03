import {reactive} from 'vue';

interface SettingsStoreInterface {
  umap: {
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
  umap: {
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
