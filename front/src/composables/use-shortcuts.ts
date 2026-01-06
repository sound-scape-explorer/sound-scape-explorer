import {type DraggableKey} from 'src/composables/use-draggables';

const draggablePrefix = '_draggable';

export enum Shortcut {
  _draggableFocus = 'Esc',
  _draggableCycleRecent = 'Tab', // just for doc
  _draggableCycleAll = '⇧+Tab', // just for doc
  _draggableClose = 'x',
  _draggableCloseExceptCurrent = '⇧ X',
  open = 'o',
  settings = ',',
  help = '?',
  view = 'w',
  colors = 'c',
  calendar = 'v',
  tags = 't',
  selection = 's',
  temporal = 'j',
  heatmaps = 'h',
  audio = 'a',
  audioPlayPause = ' ',
  details = 'd',
  trajectories = 'y',
  relativeTrajectories = '⇧ Y',
}

export interface ShortcutSerialized {
  keycode: string;
  name: string;
}

const shortcuts: ShortcutSerialized[] = [];
const draggables: ShortcutSerialized[] = [];
const alphas: ShortcutSerialized[] = [];
const betas: ShortcutSerialized[] = [];

Object.entries(Shortcut).forEach((entry) => {
  const [name, keycode] = entry;

  const shortcut: ShortcutSerialized = {
    keycode,
    name,
  };

  const isDraggable = name.startsWith(draggablePrefix);

  if (isDraggable) {
    shortcut.name = name.replace(draggablePrefix, '');
    draggables.push(shortcut);
    return;
  }

  shortcuts.push(shortcut);
});

// shortcuts.sort((a, b) => a.name.localeCompare(b.name));

export function useKeyboardShortcuts() {
  const getKey = (key: DraggableKey) => Shortcut[key];

  return {
    shortcuts,
    draggables,
    alphas,
    betas,
    getKey,
  };
}
