import {reactive} from 'vue';

export interface AppDraggablesStore {
  import: boolean;
  settings: boolean;
  help: boolean;
  selection: boolean;
  colors: boolean;
  queries: boolean;
  time: boolean;
  meta: boolean;
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
  queries: false,
  time: false,
  meta: false,
  audio: false,
  details: false,
  trajectories: false,
  indicators: false,
  digested: false,
});
