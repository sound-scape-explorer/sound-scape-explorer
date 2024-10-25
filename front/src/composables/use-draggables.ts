import {computed, reactive, ref} from 'vue';

export interface DraggablesStore {
  open: boolean;
  settings: boolean;
  help: boolean;
  view: boolean;
  colors: boolean;
  calendar: boolean;
  timeline: boolean;
  labels: boolean;
  audio: boolean;
  details: boolean;
  trajectories: boolean;
  relativeTrajectories: boolean;
  temporal: boolean;
  heatmaps: boolean;
  selection: boolean; // 3d beta
  histograms: boolean;
}

export type DraggableKey = keyof DraggablesStore;

// draggable keys
const store = reactive<DraggablesStore>({
  open: false,
  settings: false,
  help: false,
  view: false,
  colors: false,
  calendar: false,
  timeline: false,
  labels: false,
  audio: false,
  details: false,
  trajectories: false,
  relativeTrajectories: false,
  temporal: false,
  heatmaps: false,
  selection: false,
  histograms: false,
});

const selected = ref<DraggableKey | null>(null);
const selectedPrevious = ref<DraggableKey | null>(null);

const active = computed<DraggableKey[]>(() => {
  let acc: DraggableKey[] = [];

  for (const [key, value] of Object.entries(store)) {
    if (value) {
      acc = [...acc, key as DraggableKey];
    }
  }

  return acc;
});

const hidden = ref<boolean>(false);

export function useDraggables() {
  const toggle = (key: DraggableKey): void => {
    const isActiveButBackground =
      active.value.includes(key) && selected.value !== key;

    if (isActiveButBackground) {
      open(key);
      return;
    }

    if (store[key]) {
      close(key);
      return;
    }

    open(key);
  };

  const close = (key: DraggableKey) => {
    if (store[key]) {
      store[key] = false;
    }

    if (selected.value === key) {
      select(selectedPrevious.value);
    }
  };

  const open = (key: DraggableKey) => {
    if (!store[key]) {
      store[key] = true;
    }

    if (selected.value !== key) {
      select(key);
    }

    if (hidden.value) {
      toggleAll();
    }
  };

  const select = (key: Nullable<DraggableKey>) => {
    if (key === null) {
      return;
    }

    selectedPrevious.value = selected.value;
    selected.value = key;
  };

  const closeSelected = () => {
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

  const cycle = (isReverse = false) => {
    if (active.value.length < 2 || selected.value === null) {
      return;
    }

    let payload: DraggableKey | null;

    if (!isReverse) {
      payload = getNextKey(selected.value);
    } else {
      payload = getPreviousKey(selected.value);
    }

    select(payload);
  };

  const getNextKey = (
    key: keyof DraggablesStore,
  ): keyof DraggablesStore | null => {
    const l = active.value.length;
    if (l === 0) {
      return null;
    }

    const i = active.value.indexOf(key);
    const next = i + 1;

    if (next >= l) {
      return active.value[0];
    }

    return active.value[next];
  };

  const getPreviousKey = (
    key: keyof DraggablesStore,
  ): keyof DraggablesStore | null => {
    const l = active.value.length;
    if (l === 0) {
      return null;
    }

    const i = active.value.indexOf(key);
    const previous = i - 1;

    if (previous < 0) {
      return active.value[l - 1];
    }

    return active.value[previous];
  };

  const toggleAll = () => (hidden.value = !hidden.value);

  return {
    selected: selected,
    store: store,
    hidden: hidden,
    open: open,
    toggle: toggle,
    toggleAll: toggleAll,
    cycle: cycle,
    close: close,
    closeAll: closeAll,
    closeSelected: closeSelected,
  };
}
