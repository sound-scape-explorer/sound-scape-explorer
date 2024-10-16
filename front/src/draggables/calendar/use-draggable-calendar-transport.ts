import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';

let interval: null | number = null;

export function useDraggableCalendarTransport() {
  const {duration, current, isAllSelected, isPlaying} = useDraggableCalendar();
  const {filterByTime} = useScatterFilterTime();

  const setWindowDuration = (newDuration: number) => {
    duration.value = newDuration;
    filterByTime();
  };

  const blurButton = (event?: MouseEvent) => {
    if (typeof event === 'undefined') {
      return;
    }

    const button = event.target as HTMLButtonElement;
    button.blur();
  };

  const togglePlaying = (event?: MouseEvent) => {
    if (isAllSelected.value) {
      return;
    }

    isPlaying.value = !isPlaying.value;
    filterByTime();
    blurButton(event);
  };

  const skipTimeForward = (event?: MouseEvent) => {
    current.value += duration.value;
    filterByTime();
    blurButton(event);
  };

  const skipTimeBackward = (event?: MouseEvent) => {
    current.value -= duration.value;
    filterByTime();
    blurButton(event);
  };

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
    current.value = t / 1000;
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
