import dayjs from 'dayjs';
import {useRanges} from 'src/composables/use-ranges';
import {useReducerSelection} from 'src/composables/use-reducer-selection';
import {SLIDER_LIMITS} from 'src/constants';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {computed, ref} from 'vue';

interface Slider {
  key: number;
  name: string;
  min: number;
  max: number;
  marks: {
    [time: number]: string;
  };
}

const active = ref<Slider | null>(null);
const cached = ref<Slider[]>();

export function useCalendarSliders() {
  const {ranges} = useRanges();
  const {reducer} = useReducerSelection();
  const {current: time, min, max} = useDraggableCalendar();

  const sliders = computed<Slider[]>(() => {
    if (ranges.value === null || reducer.value === null) {
      return [];
    }

    if (active.value !== null) {
      return [active.value];
    }

    if (typeof cached.value !== 'undefined') {
      return cached.value;
    }

    const ss: Slider[] = [];

    for (const range of ranges.value) {
      const timeStart = dayjs(range.start).unix();
      const timeEnd = dayjs(range.end).unix();
      const timeBetween = Math.floor(timeStart + 0.5 * (timeEnd - timeStart));

      if (min.value === -1 || timeStart < min.value) {
        min.value = timeStart;
      }

      if (max.value === -1 || timeEnd > max.value) {
        max.value = timeEnd;
      }

      const s: Slider = {
        key: range.index,
        name: range.name,
        min: timeStart,
        max: timeEnd,
        marks: {
          [timeStart]: SLIDER_LIMITS.start,
          [timeBetween]: range.name.toString(),
          [timeEnd]: SLIDER_LIMITS.end,
        },
      };

      ss.push(s);
    }

    ss.sort((a, b) => a.min - b.max);
    time.value = min.value;
    cached.value = ss;
    return ss;
  });

  const toggleZoom = (s: Slider) => {
    if (active.value !== null) {
      active.value = null;
      return;
    }

    active.value = s;
  };

  return {
    sliders: sliders,
    toggleZoom: toggleZoom,
  };
}
