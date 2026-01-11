import {type Intent} from '@blueprintjs/core';
import {useEffect, useRef} from 'react';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import {useTableLoader} from 'src/panels/files/hooks/use-table-loader.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';

function arraysEqual(a: Intent[] | null, b: Intent[]): boolean {
  if (a === null || a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

export function useTablePathValidation() {
  const {settings} = useSettingsState();
  const {isLoaded} = useTableLoader();
  const {state, setState} = useTableState();
  const prevIntentsRef = useRef<Intent[] | null>(null);

  const audioPath = settings.audioPath;
  const paths = state.rows['col_path'];
  const columns = state.columns;

  useEffect(() => {
    if (!isLoaded || !audioPath) {
      return;
    }

    // Check if Path column exists
    const hasPathColumn = columns.some((c) => c.name === 'Path');
    if (!hasPathColumn || !paths) {
      return;
    }

    const length = paths.length;
    const intents = new Array<Intent>(length).fill('danger');

    for (let i = 0; i < length; i++) {
      const file = paths[i];
      if (!file) {
        continue;
      }

      const fullPath = window.electronAPI.joinPath(audioPath, file);
      const exists = window.electronAPI.getPathExistence(fullPath);
      if (exists) {
        intents[i] = 'success';
      }
    }

    // Bail if unchanged
    if (arraysEqual(prevIntentsRef.current, intents)) {
      return;
    }

    prevIntentsRef.current = intents;

    setState((prev) => ({
      ...prev,
      current: {
        ...prev.current,
        intents: {
          ...prev.current.intents,
          col_path: intents,
        },
      },
    }));
  }, [isLoaded, audioPath, paths, columns, setState]);
}
