import {computed, ref} from 'vue';

export type Worker = typeof import('src/common/worker');
const worker = ref<Worker | null>(null);
const hasWorker = computed<boolean>(() => worker.value !== null);

export function useWorker() {
  const close = () => {
    worker.value?.close();
  };

  const create = () => {
    worker.value = new ComlinkWorker<Worker>(
      new URL('../common/worker', import.meta.url),
    );
  };

  return {
    worker: worker,
    hasWorker: hasWorker,
    close: close,
    create: create,
  };
}
