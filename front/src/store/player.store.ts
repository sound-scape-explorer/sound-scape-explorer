import {reactive} from 'vue';

interface PlayerStore {
  src: null | string;
}

export const playerStore = reactive<PlayerStore>({
  src: null,
});
