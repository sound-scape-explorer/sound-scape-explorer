import {type Dayjs} from 'dayjs';
import {type ComputedRef, ref} from 'vue';

const start = ref<number>(0);
const end = ref<number>(0);

const left = ref<number>(0);
const right = ref<number>(0);
const duration = ref<number>(0);

export function useTimelineRange() {
  const moveCursor = (deltaPercent: number) => {
    let newLeft = left.value + deltaPercent;
    let newRight = newLeft + duration.value;

    if (newLeft < start.value) {
      newLeft = start.value;
    }

    if (newRight > end.value) {
      newRight = end.value;
    }

    updateLeft(newLeft);
    updateRight(newRight);
  };

  const moveRight = (deltaPercent: number) => {
    const next = right.value + deltaPercent;

    if (next <= left.value) {
      return;
    }

    updateRight(next);
  };

  const moveLeft = (deltaPercent: number) => {
    const next = left.value + deltaPercent;

    if (next >= right.value) {
      return;
    }

    updateLeft(next);
  };

  const updateLeft = (newLeft: number) => {
    left.value = newLeft;
    updateDuration();
  };

  const updateRight = (newRight: number) => {
    right.value = newRight;
    updateDuration();
  };

  const updateDuration = () => {
    duration.value = right.value - left.value;
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
    duration: duration,
    moveCursor: moveCursor,
    moveLeft: moveLeft,
    moveRight: moveRight,
    updateLeft: updateLeft,
    updateRight: updateRight,
    serialize: serialize,
  };
}
