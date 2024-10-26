import {type Dayjs} from 'dayjs';
import {type ComputedRef, ref} from 'vue';

const start = ref<number>(0);
const end = ref<number>(0);

const left = ref<number>(0);
const right = ref<number>(0);

export function useTimelineRange() {
  const moveCursor = (deltaPercent: number) => {
    const cursor = right.value - left.value;

    let newStart = left.value + deltaPercent;
    let newEnd = newStart + cursor;

    if (newStart < start.value) {
      newStart = start.value;
    }

    if (newEnd > end.value) {
      newEnd = end.value;
    }

    left.value = newStart;
    right.value = newEnd;
  };

  const moveRight = (deltaPercent: number) => {
    const next = right.value + deltaPercent;

    if (next <= left.value) {
      return;
    }

    right.value = next;
  };

  const moveLeft = (deltaPercent: number) => {
    const next = left.value + deltaPercent;

    if (next >= right.value) {
      return;
    }

    left.value = next;
  };

  const updateStart = (newStart: number) => {
    left.value = newStart;
  };

  const updateEnd = (newEnd: number) => {
    right.value = newEnd;
  };

  const serialize = (
    dateStart: ComputedRef<Dayjs>,
    dateEnd: ComputedRef<Dayjs>,
  ) => {
    left.value = dateStart.value.unix() * 1000;
    right.value = dateEnd.value.unix() * 1000;
  };

  return {
    start: start,
    end: end,
    left: left,
    right: right,
    moveCursor: moveCursor,
    moveEnd: moveRight,
    moveStart: moveLeft,
    updateStart: updateStart,
    updateEnd: updateEnd,
    serialize: serialize,
  };
}
