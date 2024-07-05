import {computed, reactive, ref} from 'vue';

export interface DraggablesStore {
  open: boolean;
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
  open: false,
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
const active = computed<DraggableKey[]>(() => {
  let acc: DraggableKey[] = [];

  for (const [key, value] of Object.entries(store)) {
    if (value) {
      acc = [...acc, key as DraggableKey];
    }
  }

  return acc;
});

export function useDraggables() {
  const toggle = (key: DraggableKey): void => {
    selected.value = key;
    store[key] = !store[key];
  };

  const close = (key: DraggableKey) => {
    if (store[key]) {
      store[key] = false;
    }

    if (selected.value === key) {
      const next = getNextKey(key);
      selected.value = next;
    }
  };

  const open = (key: DraggableKey) => {
    if (!store[key]) {
      store[key] = true;
    }

    if (selected.value !== key) {
      selected.value = key;
    }
  };

  const closeActive = () => {
    if (selected.value === null) {
      return;
    }

    close(selected.value);
  };

  const closeAll = () => {
    const keys = Object.keys(store) as DraggableKey[];

    for (const key of keys) {
      close(key);
    }
  };

  const cycle = () => {
    if (active.value.length < 2 || selected.value === null) {
      return;
    }

    const next = getNextKey(selected.value);
    selected.value = next;
  };

  const getNextKey = (
    key: keyof DraggablesStore,
  ): keyof DraggablesStore | null => {
    if (active.value.length === 0) {
      return null;
    }

    const i = active.value.indexOf(key);

    if (i + 1 >= active.value.length) {
      return active.value[0];
    }

    return active.value[i + 1];
  };

  return {
    selected: selected,
    store: store,
    open: open,
    toggle: toggle,
    cycle: cycle,
    close: close,
    closeAll: closeAll,
    closeActive: closeActive,
  };
}
