import {useCalendarRange} from 'src/components/timeline/use-calendar-range';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {ref} from 'vue';

let interval: null | number = null;

const duration = ref<number>(0);

export function useDraggableCalendarTransport() {
  const {isActive, isPlaying} = useDraggableCalendar();
  const {left, right} = useCalendarRange();

  const setWindowDuration = (newDuration: number) => {
    duration.value = newDuration * 1000;
    right.value = left.value + duration.value;
  };

  const blurButton = (event?: MouseEvent) => {
    if (typeof event === 'undefined') {
      return;
    }

    const button = event.target as HTMLButtonElement;
    button.blur();
  };

  const togglePlaying = (event?: MouseEvent) => {
    if (!isActive.value) {
      return;
    }

    isPlaying.value = !isPlaying.value;
    blurButton(event);
  };

  const skipTimeForward = (event?: MouseEvent) => {
    left.value += duration.value;
    right.value += duration.value;
    blurButton(event);
  };

  const skipTimeBackward = (event?: MouseEvent) => {
    left.value -= duration.value;
    right.value -= duration.value;
    blurButton(event);
  };

  // TODO: these transport actions should manipulate isPlaying.value instead of the toggler...
  const start = () => {
    if (interval) {
      return;
    }

    interval = setInterval(skipTimeForward, 500);
  };

  const stop = () => {
    if (interval === null) {
      return;
    }

    clearInterval(interval);
    interval = null;
  };

  const handleDateStartUpdate = (t: number) => {
    left.value = t;
  };

  return {
    setWindowDuration: setWindowDuration,
    blurButton: blurButton,
    togglePlaying: togglePlaying,
    skipTimeForward: skipTimeForward,
    skipTimeBackward: skipTimeBackward,
    start: start,
    stop: stop,
    handleDateStartUpdate: handleDateStartUpdate,
  };
}
