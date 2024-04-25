import {reactive, ref} from 'vue';

export interface DraggablesStore {
  import: boolean;
  settings: boolean;
  help: boolean;
  selection: boolean;
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
}

const store = reactive<DraggablesStore>({
  import: false,
  settings: false,
  help: false,
  selection: false,
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
});

const selected = ref<string | null>(null);

export function useDraggables() {
  const toggle = (key: keyof DraggablesStore): void => {
    selected.value = key;
    store[key] = !store[key];
  };

  return {
    selected: selected,
    store: store,
    toggle: toggle,
  };
}
