import {useDraggableCalendar} from 'src/draggables/calendar/use-draggable-calendar';
import {useDraggableCalendarTransport} from 'src/draggables/calendar/use-draggable-calendar-transport';
import {watch} from 'vue';

export function useDraggableCalendarLifecycles() {
  const {isPlaying} = useDraggableCalendar();
  const {start} = useDraggableCalendarTransport();

  const handleToggleButton = () => {
    if (isPlaying.value) {
      start();
      return;
    }

    stop();
  };

  watch(isPlaying, handleToggleButton);
}
