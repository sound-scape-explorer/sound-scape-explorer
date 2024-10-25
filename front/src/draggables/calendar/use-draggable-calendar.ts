import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {computed, ref} from 'vue';

export interface CalendarDuration {
  name: string;
  duration: number | 'double' | 'half'; // seconds
}

const durations: CalendarDuration[] = [
  {name: '1m', duration: 60},
  {name: '5m', duration: 60 * 5},
  {name: '15m', duration: 60 * 15},
  {name: '1h', duration: 60 * 60},
  {name: '4h', duration: 60 * 60 * 4},
  {name: '1d', duration: 60 * 60 * 24},
  {name: '1w', duration: 60 * 60 * 24 * 7},
  {name: '*2', duration: 'double'},
  {name: '/2', duration: 'half'},
];

const duration = ref<CalendarDuration['duration']>(durations[0].duration);

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
