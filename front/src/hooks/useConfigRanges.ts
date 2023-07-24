import {reactive, watchEffect} from 'vue';
import {workerRef} from './useWorker';
import {fileRef} from './useFile';

export interface ConfigRange {
  index: number;
  name: string;
  start: number;
  end: number;
}

interface ConfigRangeRef {
  value: ConfigRange | null;
}

interface ConfigRangesRef {
  value: ConfigRange[] | null;
}

export const configRangeRef = reactive<ConfigRangeRef>({
  value: null,
});

export const configRangesRef = reactive<ConfigRangesRef>({
  value: null,
});

export function useConfigRanges() {
  const readRanges = async () => {
    if (workerRef.value === null || fileRef.value === null) {
      return;
    }

    configRangesRef.value = await workerRef.value.readConfigRanges(
      fileRef.value,
    );
  };

  watchEffect(readRanges);

  const selectRange = (name: string | null) => {
    if (name === null) {
      configRangeRef.value = null;
      return;
    }

    if (configRangesRef.value === null) {
      return;
    }

    configRangeRef.value = configRangesRef.value.filter(
      (range) => range.name === name,
    )[0];
  };

  return {
    selectRange: selectRange,
  };
}
