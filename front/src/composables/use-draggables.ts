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
  temporal: boolean;
  heatmaps: boolean;
  selection: boolean;
}

export type DraggableKey = keyof DraggablesStore;

// draggable keys
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
  temporal: false,
  heatmaps: false,
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

  const close = (key: DraggableKey) => {
    if (!store[key]) {
      return;
    }

    store[key] = false;
  };

  const closeAllDraggables = () => {
    const keys = Object.keys(store) as DraggableKey[];

    for (const key of keys) {
      close(key);
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
