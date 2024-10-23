import {computed, ref} from 'vue';

const config = ref({
  startX: 0,
  startY: 0,
  width: 0,
  rowHeight: 20,
  rows: 10,
});

const time = ref({
  minTime: 0,
  maxTime: 48,
  divisions: 24,
  every: 12,
});

export function useTimelineConfig() {
  const height = computed(() => config.value.rows * config.value.rowHeight);

  const refresh = (width: number) => {
    config.value = {
      ...config.value,
      width: width,
    };
  };

  return {
    config: config,
    time: time,
    height: height,
    refresh: refresh,
  };
}
