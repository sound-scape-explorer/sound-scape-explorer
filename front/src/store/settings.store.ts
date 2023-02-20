import type {File as H5File} from 'h5wasm';
import {reactive} from 'vue';

interface SettingsStoreInterface {
  debug: boolean;
  storage: {
    isReady: boolean;
    file: H5File | null;
  };
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
  storage: {
    isReady: false,
    file: null,
  },
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
