import type {DraggableKey} from 'src/composables/use-draggables';

export enum Shortcuts {
  open = 'o',
  settings = ',',
  help = 'h',
  view = 'i',
  colors = 'c',
  labels = 'z',
  labelsZoom = 'Z',
  audio = 'a',
  details = 'd',
  trajectories = 'x',
  relativeTrajectories = 'r',
  temporal = 'v',
  heatmaps = 'b',
  time = 't',
  timeline = 'T',
  timePlayPause = ' ',
  timeBackward = 'p',
  timeForward = 'n',
  selection = 's',
  selectHotkey = 'j',
}

interface ShortcutSerialized {
  keycode: string;
  name: string;
}

export function useKeyboardShortcuts() {
  const shortcuts: ShortcutSerialized[] = Object.entries(Shortcuts).map(
    (entry) => {
      const [name, keycode] = entry;

      return {
        keycode: keycode,
        name: name,
      };
    },
  );

  const getKey = (key: DraggableKey) => Shortcuts[key];

  return {
    shortcuts: shortcuts,
    getKey: getKey,
  };
}
