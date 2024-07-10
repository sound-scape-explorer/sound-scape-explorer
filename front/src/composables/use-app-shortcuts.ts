import {useScreen} from 'src/components/screen/use-screen';
import {useAppMetaKeys} from 'src/composables/use-app-meta-keys';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDraggables} from 'src/composables/use-draggables';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {Shortcuts} from 'src/composables/use-shortcuts';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

export function useAppShortcuts() {
  useAppMetaKeys();

  const {registerKey} = useGlobalKeyboard();
  const {isReady} = useStorageReady();
  const {toggle} = useDraggables();
  const {isPreview} = useClientSettings();
  const {enable} = useScreen();
  const {toggleExpand} = useDraggableLabels();

  registerKey(Shortcuts.open, () => toggle('open'));
  registerKey(Shortcuts.settings, () => isReady.value && toggle('settings'));
  registerKey(Shortcuts.help, () => toggle('help'));
  registerKey(Shortcuts.view, () => toggle('view'));
  registerKey(Shortcuts.colors, () => toggle('colors'));
  registerKey(Shortcuts.calendar, () => toggle('calendar'));
  registerKey(Shortcuts.timeline, () => isPreview.value && toggle('timeline'));
  registerKey(Shortcuts.labels, () => toggle('labels'));
  registerKey(Shortcuts.details, () => toggle('details'));
  registerKey(Shortcuts.audio, () => toggle('audio'));
  registerKey(Shortcuts.trajectories, () => toggle('trajectories'));
  registerKey(Shortcuts.relativeTrajectories, () =>
    toggle('relativeTrajectories'),
  );
  registerKey(Shortcuts.temporal, () => toggle('temporal'));
  registerKey(Shortcuts.heatmaps, () => toggle('heatmaps'));
  registerKey(
    Shortcuts.selection,
    () => isPreview.value && toggle('selection'),
  );
  registerKey(Shortcuts.selectHotkey, () => isPreview.value && enable());

  registerKey(Shortcuts.labelsZoom, toggleExpand);
}
