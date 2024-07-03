import {KeyboardShortcut} from 'src/common/keyboard-shortcuts';
import {useScreen} from 'src/components/screen/use-screen';
import {useAppMetaKeys} from 'src/composables/use-app-meta-keys';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDraggables} from 'src/composables/use-draggables';
import {useKeyboard} from 'src/composables/use-keyboard';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

export function useAppShortcuts() {
  useAppMetaKeys();

  const {registerKey} = useKeyboard();
  const {isReady} = useStorageReady();
  const {toggle} = useDraggables();
  const {preview} = useClientSettings();
  const {enable} = useScreen();
  const {toggleExpand} = useDraggableLabels();

  registerKey(KeyboardShortcut.open, () => toggle('open'));
  registerKey(
    KeyboardShortcut.settings,
    () => isReady.value && toggle('settings'),
  );
  registerKey(KeyboardShortcut.help, () => toggle('help'));
  registerKey(KeyboardShortcut.view, () => toggle('view'));
  registerKey(KeyboardShortcut.colors, () => toggle('colors'));
  registerKey(KeyboardShortcut.time, () => toggle('time'));
  registerKey(
    KeyboardShortcut.timeline,
    () => preview.value && toggle('timeline'),
  );
  registerKey(KeyboardShortcut.labels, () => toggle('labels'));
  registerKey(KeyboardShortcut.details, () => toggle('details'));
  registerKey(KeyboardShortcut.audio, () => toggle('audio'));
  registerKey(KeyboardShortcut.trajectories, () => toggle('trajectories'));
  registerKey(KeyboardShortcut.relativeTrajectories, () =>
    toggle('relativeTrajectories'),
  );
  registerKey(KeyboardShortcut.temporal, () => toggle('temporal'));
  registerKey(KeyboardShortcut.heatmaps, () => toggle('heatmaps'));
  registerKey(
    KeyboardShortcut.selection,
    () => preview.value && toggle('selection'),
  );
  registerKey(KeyboardShortcut.selectHotkey, () => preview.value && enable());

  registerKey(KeyboardShortcut.labelsZoom, toggleExpand);
}
