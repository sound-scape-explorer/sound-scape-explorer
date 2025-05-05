import {type Remote} from 'comlink';
import {computed, ref} from 'vue';

export type Worker = typeof import('src/common/worker');
const worker = ref<Remote<Worker> | null>(null);
const hasWorker = computed<boolean>(() => worker.value !== null);

export function useWorker() {
  const close = () => {
    worker.value?.close();
  };

  const create = () => {
    // eslint-disable-next-line no-undef
    worker.value = new ComlinkWorker<Remote<Worker>>(
      new URL('../common/worker', import.meta.url),
    );
  };

  return {
    worker,
    hasWorker,
    close,
    create,
  };
}
