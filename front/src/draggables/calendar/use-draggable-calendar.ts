import {type Dayjs} from 'dayjs';
import {useScatterLoading} from 'src/components/scatter/use-scatter-loading';
import {useDate} from 'src/composables/use-date';
import {computed, ref} from 'vue';

interface Duration {
  name: string;
  duration: number; // seconds
}

const durations: Duration[] = [
  {name: '10min', duration: 600},
  {name: '1h', duration: 3600},
  {name: '24h', duration: 3600 * 24},
  {name: '1w', duration: 3600 * 24 * 7},
];

const isActive = ref<boolean>(false);
const duration = ref<number>(3600);
const current = ref<number>(-1);
const min = ref<number>(-1);
const max = ref<number>(-1);
const isPlaying = ref<boolean>(false);

export function useDraggableCalendar() {
  const {isLoading} = useScatterLoading();
  const {convertTimestampToDate} = useDate();

  const uiDisabled = computed<boolean>(
    () => isLoading.value || !isActive.value,
  );

  const dateStart = computed<Dayjs>(() => {
    let t = current.value;

    if (!isActive.value) {
      t = min.value;
    }

    return convertTimestampToDate(t * 1000);
  });

  const dateEnd = computed<Dayjs>(() => {
    const endTimestamp = dateStart.value.unix() * 1000 + duration.value * 1000;
    return convertTimestampToDate(endTimestamp);
  });

  return {
    isActive: isActive,
    duration: duration,
    current: current,
    min: min,
    max: max,
    isPlaying: isPlaying,
    durations: durations,
    uiDisabled: uiDisabled,
    dateStart: dateStart,
    dateEnd: dateEnd,
  };
}
