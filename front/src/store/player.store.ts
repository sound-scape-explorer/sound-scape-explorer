import {reactive} from 'vue';

interface PlayerStore {
  src: null | string;
  timestamp: null | number;
}

export const playerStore = reactive<PlayerStore>({
  src: null,
  timestamp: null,
});
