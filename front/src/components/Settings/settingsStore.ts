import type {File as H5File} from 'h5wasm';
import {reactive} from 'vue';

export interface SettingsStore {
  preview: boolean;
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
      meta: boolean;
      points: boolean;
      features: boolean;
    };
  };
}

export const settingsStore = reactive<SettingsStore>({
  preview: false,
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
      meta: true,
      points: true,
      features: true,
    },
  },
});
