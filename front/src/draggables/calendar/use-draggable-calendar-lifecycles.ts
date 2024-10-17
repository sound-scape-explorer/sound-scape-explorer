import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useDraggableCalendarTransport} from 'src/draggables/calendar/use-draggable-calendar-transport';
import {watch} from 'vue';

export function useDraggableCalendarLifecycles() {
  const {isPlaying, isActive} = useDraggableCalendar();
  const {start, stop} = useDraggableCalendarTransport();

  const handleToggleButton = () => {
    if (isPlaying.value) {
      start();
      return;
    }

    stop();
  };

  const onInactive = () => {
    if (isPlaying.value && !isActive.value) {
      isPlaying.value = false;
    }
  };

  watch(isPlaying, handleToggleButton);
  watch([isPlaying, isActive], onInactive);
}
