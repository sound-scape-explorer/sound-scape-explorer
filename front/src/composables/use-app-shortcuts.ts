import {useScreen} from 'src/components/screen/use-screen';
import {useAppMetaKeys} from 'src/composables/use-app-meta-keys';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDraggables} from 'src/composables/use-draggables';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {Shortcuts} from 'src/composables/use-shortcuts';
import {useStorageReady} from 'src/composables/use-storage-ready';
import {useViewState} from 'src/composables/use-view-state';
import {useDraggableLabels} from 'src/draggables/labels/use-draggable-labels';

export function useAppShortcuts() {
  useAppMetaKeys();

  const {registerKey} = useGlobalKeyboard();
  const {isReady} = useStorageReady();
  const {toggle} = useDraggables();
  const {isPreview} = useClientSettings();
  const {enable} = useScreen();
  const {toggleExpand} = useDraggableLabels();
  const {hasView} = useViewState();

  registerKey(Shortcuts.open, () => toggle('open'));
  registerKey(Shortcuts.settings, () => isReady.value && toggle('settings'));
  registerKey(Shortcuts.help, () => toggle('help'));
  registerKey(Shortcuts.view, () => toggle('view'));
  registerKey(Shortcuts.colors, () => hasView.value && toggle('colors'));
  registerKey(Shortcuts.calendar, () => hasView.value && toggle('calendar'));
  registerKey(
    Shortcuts.timeline,
    () => hasView.value && isPreview.value && toggle('timeline'),
  );
  registerKey(Shortcuts.labels, () => hasView.value && toggle('labels'));
  registerKey(Shortcuts.details, () => hasView.value && toggle('details'));
  registerKey(Shortcuts.audio, () => hasView.value && toggle('audio'));
  registerKey(
    Shortcuts.trajectories,
    () => hasView.value && toggle('trajectories'),
  );
  registerKey(
    Shortcuts.relativeTrajectories,
    () => hasView.value && toggle('relativeTrajectories'),
  );
  registerKey(Shortcuts.temporal, () => hasView.value && toggle('temporal'));
  registerKey(Shortcuts.heatmaps, () => hasView.value && toggle('heatmaps'));
  registerKey(
    Shortcuts.histograms,
    () => hasView.value && toggle('histograms'),
  );
  registerKey(
    Shortcuts.selection,
    () => hasView.value && isPreview.value && toggle('selection'),
  );
  registerKey(
    Shortcuts.selectHotkey,
    () => hasView.value && isPreview.value && enable(),
  );

  registerKey(Shortcuts.labelsZoom, toggleExpand);
}
