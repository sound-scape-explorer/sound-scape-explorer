import {useTimelineRange} from 'src/components/timeline/use-timeline-range';
import {TIMEOUT} from 'src/constants';
import {
  type CalendarDuration,
  useDraggableCalendar,
} from 'src/draggables/calendar/use-draggable-calendar';

let interval: null | number = null;

export function useDraggableCalendarTransport() {
  const {isPlaying} = useDraggableCalendar();
  const {left, right, duration} = useTimelineRange();

  const setWindowDuration = (d: CalendarDuration) => {
    switch (d.duration) {
      case 'double': {
        duration.value *= 2;
        break;
      }
      case 'half': {
        duration.value /= 2;
        break;
      }
      default: {
        duration.value = d.duration * 1000;
      }
    }

    right.value = left.value + duration.value;
  };

  const blurButton = (event?: MouseEvent) => {
    if (typeof event === 'undefined') {
      return;
    }

    const button = event.target as HTMLButtonElement;
    button.blur();
  };

  const handleToggle = () => {
    if (isPlaying.value) {
      stop();
      isPlaying.value = false;
      return;
    }

    start();
    isPlaying.value = true;
  };

  const skipTimeForward = () => {
    left.value += duration.value;
    right.value += duration.value;
  };

  const skipTimeBackward = () => {
    left.value -= duration.value;
    right.value -= duration.value;
  };

  const start = () => {
    if (interval) {
      return;
    }

    interval = window.setInterval(skipTimeForward, TIMEOUT * 2);
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
    setWindowDuration,
    blurButton,
    handleToggle,
    skipTimeForward,
    skipTimeBackward,
    handleDateStartUpdate,
  };
}
