import {reactive} from 'vue';

export interface AppDraggablesStore {
  import: boolean;
  settings: boolean;
  help: boolean;
  selection: boolean;
  colors: boolean;
  time: boolean;
  labels: boolean;
  audio: boolean;
  details: boolean;
  trajectories: boolean;
  indicators: boolean;
  digested: boolean;
}

export const appDraggablesStore = reactive<AppDraggablesStore>({
  import: false,
  settings: false,
  help: false,
  selection: false,
  colors: false,
  time: false,
  labels: false,
  audio: false,
  details: false,
  trajectories: false,
  indicators: false,
  digested: false,
});
