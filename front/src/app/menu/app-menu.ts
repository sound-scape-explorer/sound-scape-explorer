import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {useScreen} from 'src/components/screen/screen';
import {useClientSettings} from 'src/composables/client-settings';
import {useDraggables} from 'src/composables/draggables';
import {useKeyboard} from 'src/composables/keyboard';
import {useStorageReady} from 'src/composables/storage-ready';

export function useAppMenu() {
  const {registerKey} = useKeyboard();
  const {isReady} = useStorageReady();
  const {toggle} = useDraggables();
  const {preview} = useClientSettings();
  const {enable} = useScreen();

  registerKey(KeyboardShortcut.import, () => toggle('import'));
  registerKey(
    KeyboardShortcut.settings,
    () => isReady.value && toggle('settings'),
  );
  registerKey(KeyboardShortcut.help, () => toggle('help'));
  registerKey(KeyboardShortcut.view, () => toggle('view'));
  registerKey(KeyboardShortcut.colors, () => toggle('colors'));
  registerKey(KeyboardShortcut.time, () => toggle('time'));
  registerKey(KeyboardShortcut.timeline, () => preview && toggle('timeline'));
  registerKey(KeyboardShortcut.labels, () => toggle('labels'));
  registerKey(KeyboardShortcut.details, () => toggle('details'));
  registerKey(KeyboardShortcut.audio, () => toggle('audio'));
  registerKey(KeyboardShortcut.trajectories, () => toggle('trajectories'));
  registerKey(KeyboardShortcut.relativeTrajectories, () =>
    toggle('relativeTrajectories'),
  );
  registerKey(KeyboardShortcut.indicators, () => toggle('indicators'));
  registerKey(KeyboardShortcut.digested, () => toggle('digested'));
  registerKey(KeyboardShortcut.selection, () => toggle('selection'));
  registerKey(KeyboardShortcut.shift, () => enable());

  return {
    isReady: isReady,
    toggle: toggle,
  };
}
