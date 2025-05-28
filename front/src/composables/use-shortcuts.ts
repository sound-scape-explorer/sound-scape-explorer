import {type DraggableKey} from 'src/composables/use-draggables';

const draggablePrefix = '_draggable';
const alphaPrefix = '_alpha';
const betaPrefix = '_beta';

export enum Shortcut {
  _alphaSelection3d = 'J',
  _draggableHideShow = 'Esc',
  _draggableCycleNext = 'Tab', // just for doc
  _draggableCyclePrevious = 'Shift+Tab', // just for doc
  _draggableClose = 'x',
  _draggableCloseExceptCurrent = 'X',
  open = 'o',
  settings = ',',
  help = '?',
  view = 'w',
  colors = 'c',
  tags = 't',
  audio = 'a',
  details = 'd',
  trajectories = 'y',
  relativeTrajectories = 'Y',
  temporal = 'T',
  histograms = 'j',
  heatmaps = 'h',
  calendar = 'v',
  audioPlayPause = ' ',
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

  const isAlpha = name.startsWith(alphaPrefix);

  if (isAlpha) {
    shortcut.name = name.replace(alphaPrefix, '');
    alphas.push(shortcut);
    return;
  }

  const isBeta = name.startsWith(betaPrefix);

  if (isBeta) {
    shortcut.name = name.replace(betaPrefix, '');
    betas.push(shortcut);
    return;
  }

  shortcuts.push(shortcut);
});

shortcuts.sort((a, b) => a.name.localeCompare(b.name));

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
