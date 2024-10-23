import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {computed, ref} from 'vue';

interface Duration {
  name: string;
  duration: number; // seconds
}

const durations: Duration[] = [
  {name: '1m', duration: 60},
  {name: '2m', duration: 60 * 2},
  {name: '5m', duration: 60 * 5},
  {name: '10m', duration: 60 * 10},
  {name: '30m', duration: 60 * 30},
  {name: '1h', duration: 60 * 60},
  {name: '24h', duration: 60 * 60 * 24},
  {name: '1w', duration: 60 * 60 * 24 * 7},
];

const duration = ref<number>(durations[0].duration);

const isActive = ref<boolean>(false);
const isPlaying = ref<boolean>(false);

export function useDraggableCalendar() {
  const {isLoading} = useScatterLoading();

  const uiDisabled = computed<boolean>(
    () => isLoading.value || !isActive.value,
  );

  return {
    isActive: isActive,
    duration: duration,
    isPlaying: isPlaying,
    durations: durations,
    uiDisabled: uiDisabled,
  };
}
