import {computed, ref, watchEffect} from 'vue';

let isLoaded = false;

export type Worker = typeof import('src/common/worker');
const worker = ref<Worker | null>(null);
const hasWorker = computed<boolean>(() => worker.value !== null);

export function useWorker() {
  const close = () => {
    worker.value?.close();
  };

  const init = () => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    worker.value = new ComlinkWorker<Worker>(
      new URL('../common/worker', import.meta.url),
    );
  };

  watchEffect(init);

  return {
    worker: worker,
    hasWorker: hasWorker,
    close: close,
  };
}
