import {onMounted, reactive} from 'vue';

type Worker = typeof import('../workers/worker');

interface WorkerRef {
  value: Worker | null;
}

export const workerRef = reactive<WorkerRef>({
  value: null,
});

export function useWorker() {
  onMounted(() => {
    workerRef.value = new ComlinkWorker<Worker>(
      new URL('../workers/worker', import.meta.url),
    );
  });
}
