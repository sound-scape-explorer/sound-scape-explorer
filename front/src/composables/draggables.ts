import {reactive, ref} from 'vue';

export interface DraggablesStore {
  import: boolean;
  settings: boolean;
  help: boolean;
  view: boolean;
  colors: boolean;
  time: boolean;
  timeline: boolean;
  labels: boolean;
  audio: boolean;
  details: boolean;
  trajectories: boolean;
  relativeTrajectories: boolean;
  indicators: boolean;
  digested: boolean;
  selection: boolean;
}

export type DraggableKey = keyof DraggablesStore;

const store = reactive<DraggablesStore>({
  import: false,
  settings: false,
  help: false,
  view: false,
  colors: false,
  time: false,
  timeline: false,
  labels: false,
  audio: false,
  details: false,
  trajectories: false,
  relativeTrajectories: false,
  indicators: false,
  digested: false,
  selection: false,
});

const selected = ref<DraggableKey | null>(null);

export function useDraggables() {
  const toggle = (key: DraggableKey): void => {
    selected.value = key;
    store[key] = !store[key];
  };

  const openAudio = () => {
    if (!store.audio) {
      store.audio = true;
    }

    if (selected.value !== 'audio') {
      selected.value = 'audio';
    }
  };

  const closeAudio = () => {
    if (store.audio) {
      store.audio = false;
    }

    if (selected.value === 'audio') {
      selected.value = null;
    }
  };

  const closeAllDraggables = () => {
    const keys = Object.keys(store);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i] as DraggableKey;

      if (!store[key]) {
        continue;
      }

      store[key] = false;
    }
  };

  return {
    selected: selected,
    store: store,
    toggle: toggle,
    openAudio: openAudio,
    closeAudio: closeAudio,
    closeAllDraggables: closeAllDraggables,
  };
}
