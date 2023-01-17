import {reactive} from 'vue';

interface UMAPScatterStoreInterface {
  ref: null | HTMLDivElement;
}

export const UMAPScatterStore = reactive<UMAPScatterStoreInterface>({
  ref: null,
});
