import {reactive, ref} from 'vue';

export interface DraggablesStore {
  _alphaSelection3d: boolean;
  open: boolean;
  settings: boolean;
  help: boolean;
  view: boolean;
  colors: boolean;
  calendar: boolean;
  labels: boolean;
  audio: boolean;
  details: boolean;
  trajectories: boolean;
  relativeTrajectories: boolean;
  temporal: boolean;
  heatmaps: boolean;
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
  labels: false,
  audio: false,
  details: false,
  trajectories: false,
  relativeTrajectories: false,
  temporal: false,
  heatmaps: false,
  _alphaSelection3d: false,
  histograms: false,
});

const hidden = ref<boolean>(false);
const stack = ref<DraggableKey[]>([]);

export function useDraggables() {
  const toggle = (key: DraggableKey): void => {
    const isBackground = stack.value.indexOf(key) !== 0;

    if (isBackground) {
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

    removeStack(key);
  };

  const open = (key: DraggableKey) => {
    if (!store[key]) {
      store[key] = true;
    }

    if (hidden.value) {
      toggleAll();
    }

    addStack(key);
  };

  const addStack = (key: DraggableKey) => {
    const i = stack.value.indexOf(key);
    if (i !== -1) {
      stack.value.splice(i, 1);
    }
    stack.value.unshift(key);
  };

  const removeStack = (key: DraggableKey) => {
    const i = stack.value.indexOf(key);

    if (i !== -1) {
      stack.value.splice(i, 1);
    }
  };

  const closeAll = () => {
    const keys = Object.keys(store) as DraggableKey[];

    for (const key of keys) {
      close(key);
    }
  };

  const closeExceptCurrent = () => {
    if (stack.value.length < 2) {
      return;
    }

    const pool = stack.value.slice(1, stack.value.length);

    for (const key of pool) {
      close(key);
    }
  };

  const cycle = (isReverse = false) => {
    const l = stack.value.length;
    if (l < 2) {
      return;
    }

    let n: number;

    if (isReverse) {
      n = (l - 1 + stack.value.indexOf(stack.value[0])) % l;
    } else {
      n = (stack.value.indexOf(stack.value[0]) + 1) % l;
    }

    const next = stack.value[n];
    open(next);
  };

  const toggleAll = () => (hidden.value = !hidden.value);
  const closeSelected = () => close(stack.value[0]);

  return {
    store,
    hidden,
    open,
    toggle,
    toggleAll,
    cycle,
    close,
    closeAll,
    closeSelected,
    closeExceptCurrent,
    stack,
  };
}
