import {useAppMetaKeys} from 'src/composables/use-app-meta-keys';
import {DraggableKey, useDraggables} from 'src/composables/use-draggables';
import {useGlobalKeyboard} from 'src/composables/use-global-keyboard';
import {Shortcut} from 'src/composables/use-shortcuts';
import {useViewState} from 'src/composables/use-view-state';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';

export function useAppShortcuts() {
  useAppMetaKeys();

  const {registerKey} = useGlobalKeyboard();
  const {toggle} = useDraggables();
  const {hasView} = useViewState();
  const {toggle: toggleAudioTransport} = useAudioTransport();

  registerKey(Shortcut.open, () => toggle(DraggableKey.enum.open));
  registerKey(Shortcut.settings, () => toggle(DraggableKey.enum.settings));
  registerKey(Shortcut.help, () => toggle(DraggableKey.enum.help));
  registerKey(Shortcut.view, () => toggle(DraggableKey.enum.view));
  registerKey(
    Shortcut.colors,
    () => hasView.value && toggle(DraggableKey.enum.colors),
  );
  registerKey(
    Shortcut.calendar,
    () => hasView.value && toggle(DraggableKey.enum.calendar),
  );
  registerKey(
    Shortcut.tags,
    () => hasView.value && toggle(DraggableKey.enum.tags),
  );
  registerKey(
    Shortcut.selection,
    () => hasView.value && toggle(DraggableKey.enum.selection),
  );
  registerKey(
    Shortcut.details,
    () => hasView.value && toggle(DraggableKey.enum.details),
  );
  registerKey(
    Shortcut.audio,
    () => hasView.value && toggle(DraggableKey.enum.audio),
  );
  registerKey(
    Shortcut.trajectories,
    () => hasView.value && toggle(DraggableKey.enum.trajectories),
  );
  registerKey(
    Shortcut.relativeTrajectories,
    () => hasView.value && toggle(DraggableKey.enum.relativeTrajectories),
  );
  registerKey(
    Shortcut.temporal,
    () => hasView.value && toggle(DraggableKey.enum.temporal),
  );
  registerKey(
    Shortcut.heatmaps,
    () => hasView.value && toggle(DraggableKey.enum.heatmaps),
  );

  registerKey(Shortcut.audioPlayPause, toggleAudioTransport);
}
