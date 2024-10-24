import {ref} from 'vue';

const min = ref<number>(0);
const max = ref<number>(10000);
const range = ref<number>(max.value - min.value);

const start = ref<number>(0);
const end = ref<number>(400);

export function useTimelineRange() {
  const updateRange = () => {
    range.value = max.value - min.value;
  };

  const moveCursor = (deltaPercent: number) => {
    const cursor = end.value - start.value;

    let newStart = start.value + deltaPercent;
    let newEnd = newStart + cursor;

    if (newStart < 0) {
      newStart = 0;
      newEnd = cursor;
    }

    if (newEnd > range.value) {
      newEnd = range.value;
      newStart = range.value - cursor;
    }

    start.value = newStart;
    end.value = newEnd;
  };

  const moveEnd = (deltaPercent: number) => {
    end.value = Math.max(
      start.value + 1,
      Math.min(range.value, end.value + deltaPercent),
    );
  };

  const moveStart = (deltaPercent: number) => {
    start.value = Math.max(
      0,
      Math.min(end.value - 1, start.value + deltaPercent),
    );
  };

  const updateStart = (newStart: number) => {
    start.value = newStart;
  };

  const updateEnd = (newEnd: number) => {
    end.value = newEnd;
  };

  return {
    min: min,
    max: max,
    range: range,
    updateRange: updateRange,
    start: start,
    end: end,
    moveCursor: moveCursor,
    moveEnd: moveEnd,
    moveStart: moveStart,
    updateStart: updateStart,
    updateEnd: updateEnd,
  };
}
