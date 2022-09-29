import {ref} from 'vue';

type Logger = string;

export function useLoggers() {
  const loggers = ref<Logger[]>(['Logger L42', 'Logger L01']);
  const activeLogger = ref<string | null>(loggers.value[0]);

  function selectLogger(logger: string) {
    if (logger === activeLogger.value) {
      return;
    }

    activeLogger.value = logger;
  }

  return {
    loggers,
    activeLogger,
    selectLogger,
  };
}
