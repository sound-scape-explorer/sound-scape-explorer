import {onMounted, ref} from 'vue';

export type Worker = typeof import('../workers/worker');
const worker = ref<Worker | null>(null);
let isLoaded = false;

export function useWorker() {
  const close = () => {
    worker.value?.close();
  };

  onMounted(() => {
    if (isLoaded) {
      return;
    }

    isLoaded = true;

    worker.value = new ComlinkWorker<Worker>(
      new URL('../workers/worker', import.meta.url),
    );
  });

  return {
    worker: worker,
    close: close,
  };
}
