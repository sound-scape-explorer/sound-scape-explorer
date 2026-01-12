import {useAppNotification} from 'src/app/notification/use-app-notification';
import {ref} from 'vue';

const DEFAULT = 0;

const start = ref<number>(0); // ms
const end = ref<number>(0); // ms

const left = ref<number>(DEFAULT);
const right = ref<number>(DEFAULT);
const duration = ref<number>(0);

export function useTimelineRange() {
  const {notify} = useAppNotification();

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
    if (newLeft >= right.value && right.value !== DEFAULT) {
      notify('error', 'Calendar', 'Start date is after end date');
      return;
    }

    left.value = newLeft;
    updateDuration();
  };

  const updateRight = (newRight: number) => {
    if (newRight <= left.value && left.value !== DEFAULT) {
      notify('error', 'Calendar', 'End date is before start date');
      return;
    }

    right.value = newRight;
    updateDuration();
  };

  const updateDuration = () => {
    duration.value = right.value - left.value;
  };

  return {
    start,
    end,
    left,
    right,
    duration,
    moveCursor,
    moveLeft,
    moveRight,
    updateLeft,
    updateRight,
  };
}
