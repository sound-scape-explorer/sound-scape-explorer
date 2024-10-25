import {type DraggableKey} from 'src/composables/use-draggables';

export enum Shortcuts {
  draggableToggle = 'Esc',
  draggableCycleRecent = 'Tab',
  draggableCycleRev = 'Shift+Tab',
  draggableClose = 'x',
  open = 'o',
  settings = ',',
  help = '?',
  view = 'w',
  colors = 'c',
  labels = 'l',
  audio = 'a',
  details = 'd',
  trajectories = 'y',
  relativeTrajectories = 'Y',
  temporal = 't',
  histograms = 'j',
  heatmaps = 'h',
  calendar = 'v',
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
  const shortcuts: ShortcutSerialized[] = Object.entries(Shortcuts)
    .map((entry) => {
      const [name, keycode] = entry;

      return {
        keycode: keycode,
        name: name,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const getKey = (key: DraggableKey) => Shortcuts[key];

  return {
    shortcuts: shortcuts,
    getKey: getKey,
  };
}
