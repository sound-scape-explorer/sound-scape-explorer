import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {Shortcuts} from 'src/composables/use-shortcuts';
import {useDraggableCalendarTransport} from 'src/draggables/calendar/use-draggable-calendar-transport';

export function useDraggableCalendarShortcuts() {
  const {skipTimeBackward, skipTimeForward, togglePlaying} =
    useDraggableCalendarTransport();
  const {registerKey} = useGlobalKeyboard();

  registerKey(Shortcuts.calendarNext, () => skipTimeForward());
  registerKey(Shortcuts.calendarPrevious, () => skipTimeBackward());
  registerKey(Shortcuts.calendarToggle, () => togglePlaying());
}
