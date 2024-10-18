import {type DraggableKey} from 'src/composables/use-draggables';

export enum Shortcuts {
  draggableToggle = 'Esc',
  draggableCycle = 'Tab',
  draggableCycleRev = 'Shift+Tab',
  draggableClose = 'x',
  open = 'o',
  settings = ',',
  help = '?',
  view = 'v',
  colors = 'c',
  labels = 'l',
  labelsZoom = 'L',
  audio = 'a',
  details = 'd',
  trajectories = 'y',
  relativeTrajectories = 'Y',
  temporal = 't',
  histograms = 'j',
  heatmaps = 'h',
  calendar = 'C',
  timeline = 'T',
  selection = 's',
  selectHotkey = 'J',
  audioPlayPause = ' ',
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
