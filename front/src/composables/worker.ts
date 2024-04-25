import {computed, onMounted, ref} from 'vue';

let isLoaded = false;

export type Worker = typeof import('../workers/worker');
const worker = ref<Worker | null>(null);
const hasWorker = computed<boolean>(() => worker.value !== null);

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
    hasWorker: hasWorker,
    close: close,
  };
}
