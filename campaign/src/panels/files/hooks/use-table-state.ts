import {type Intent} from '@blueprintjs/core';
import {atom, useAtom} from 'jotai';
import {useCallback, useMemo} from 'react';
import {useNotify} from 'src/hooks/use-notify.ts';
import {addPrefixToLabelProperty} from 'src/utils/files.ts';
import {filterOutKey} from 'src/utils/objects.ts';

export type ColumnKey = `col_${string}`;
type ColumnName = 'Index' | 'Path' | 'Date' | 'Site' | string;
type ColumnType = 'readonly' | 'editable' | 'user';
type Validator = (value: string) => Intent;

export interface Column {
  key: ColumnKey;
  name: ColumnName;
  type: ColumnType;
  validator: Validator | null;
}

export interface TableState {
  columns: Column[];
  order: ColumnKey[];
  rows: Record<ColumnKey, string[]>;
  intents: Record<ColumnKey, Intent[]>;
}

const defaultState: TableState = {
  columns: [],
  order: [],
  rows: {},
  intents: {},
};

const stateAtom = atom<{
  current: TableState;
  past: TableState[];
  future: TableState[];
}>({
  current: defaultState,
  past: [], // limit to 2 entries
  future: [], // limit to 2 entries
});

// very dumb but hey
let uniqueIndex = 0;

interface CreateColumnOptions {
  key: ColumnKey | null;
  type: ColumnType;
  data: string[];
  validator?: Validator;
}

export function useTableState() {
  const [state, setState] = useAtom(stateAtom);
  const {notify} = useNotify();

  const getTableLength = useCallback(() => {
    return state.current.rows['col_index'].length;
  }, [state]);

  const clearHistory = useCallback(() => {
    setState((prev) => {
      return {
        ...prev,
        past: [],
        future: [],
      };
    });
  }, [setState]);

  const generateHistory = useCallback((s: typeof state) => {
    return {
      past: [s.current, ...s.past].slice(0, 2),
      future: [],
    };
  }, []);

  const getColKey = useCallback(
    (colIndex: number) => {
      return state.current.order[colIndex];
    },
    [state],
  );

  const getColNames = useCallback(() => {
    return state.current.columns.map((c) => c.name);
  }, [state]);

  const findColumnByName = useCallback(
    (name: ColumnName) => {
      const column = state.current.columns.find((c) => c.name === name);

      if (!column) {
        const msg = `Could not find column name ${name}`;
        notify(msg);
        throw new Error(msg);
      }

      return column;
    },
    [state, notify],
  );

  const findColumnByKey = useCallback(
    (key: ColumnKey) => {
      const column = state.current.columns.find((c) => c.key === key);

      if (!column) {
        const msg = `Could not find column key ${key}`;
        notify(msg);
        throw new Error(msg);
      }

      return column;
    },
    [state, notify],
  );

  const findColumnByIndex = useCallback(
    (index: number) => {
      const key = getColKey(index);
      return findColumnByKey(key);
    },
    [getColKey, findColumnByKey],
  );

  // claude, moving works great from right to left but not from left to right. rewrite this method
  const reorder = useCallback(
    (oldIndex: number, newIndex: number, count: number) => {
      setState((prev) => {
        const copy = [...prev.current.order];
        const moved = copy.splice(oldIndex, count);
        copy.splice(newIndex, 0, ...moved);

        return {
          ...prev,
          ...generateHistory(prev),
          current: {
            ...prev.current,
            order: copy,
          },
        };
      });
    },
    [generateHistory, setState],
  );

  const createColumn = useCallback(
    (name: string, opts?: CreateColumnOptions) => {
      const names = getColNames();

      if (names.includes(name)) {
        notify('name already exists', 'danger');
        return;
      }

      uniqueIndex += 1;

      const key: ColumnKey = opts?.key ?? `col_${uniqueIndex}`;
      const type = opts?.type ?? 'user';
      const validator = opts?.validator ?? null;

      const column: Column = {
        key,
        name,
        type,
        validator,
      };

      const intents =
        validator && opts?.data ? opts.data.map((d) => validator(d)) : [];

      setState((prev) => {
        return {
          ...prev,
          ...generateHistory(prev),
          current: {
            ...prev.current,
            columns: [...prev.current.columns, column],
            order: [...prev.current.order, key],
            rows: {
              ...prev.current.rows,
              [key]: opts?.data ?? new Array(getTableLength()).fill(''),
            },
            intents: {
              ...prev.current.intents,
              [key]: intents,
            },
          },
        };
      });
    },
    [generateHistory, notify, setState, getColNames, getTableLength],
  );

  const renameColumn = useCallback(
    (column: Column, name: string) => {
      if (column.type !== 'user') {
        notify('only user column can be edited', 'danger');
        return;
      }

      const prefixed = addPrefixToLabelProperty(name);

      setState((prev) => {
        return {
          ...prev,
          ...generateHistory(prev),
          current: {
            ...prev.current,
            columns: prev.current.columns.map((c) =>
              c.key === column.key ? {...c, name: prefixed} : c,
            ),
          },
        };
      });
    },
    [generateHistory, setState, notify],
  );

  const removeColumn = useCallback(
    (column: Column) => {
      if (column.type !== 'user') {
        notify('only user column can be edited', 'danger');
        return;
      }

      setState((prev) => {
        return {
          ...prev,
          ...generateHistory(prev),
          current: {
            ...prev.current,
            columns: prev.current.columns.filter((c) => c.key !== column.key),
            order: prev.current.order.filter((c) => c !== column.key),
            rows: filterOutKey(prev.current.rows, column.key),
            intents: filterOutKey(prev.current.intents, column.key),
          },
        };
      });
    },
    [generateHistory, setState, notify],
  );

  const updateRows = useCallback(
    (values: string[], colIndex: number, row = 0) => {
      const column = findColumnByIndex(colIndex);
      const key = column.key;

      if (column.type === 'readonly') {
        // silent
        return;
      }

      const rowCopy = [...(state.current.rows[key] || [])];
      const intentsCopy = [...(state.current.intents[key] || [])];

      if (row + values.length > rowCopy.length) {
        rowCopy.length = Math.max(rowCopy.length, row + values.length);
        rowCopy.fill('', state.current.rows[key].length, rowCopy.length);
      }

      for (let i = 0; i < values.length; i += 1) {
        const v = values[i];

        rowCopy[row + i] = v;

        if (column?.validator) {
          intentsCopy[row + i] = column?.validator(v);
        }
      }

      setState((prev) => {
        return {
          ...prev,
          ...generateHistory(prev),
          current: {
            ...prev.current,
            rows: {
              ...prev.current.rows,
              [key]: rowCopy,
            },
            intents: {
              ...prev.current.intents,
              [key]: intentsCopy,
            },
          },
        };
      });
    },
    [generateHistory, state, setState, findColumnByIndex],
  );

  const updatePathIntents = useCallback(
    (audioPath: string) => {
      const names = getColNames();
      if (!names.includes('Path')) {
        return;
      }

      const length = getTableLength();
      const key = 'col_path';

      const intents = new Array<Intent>(length).fill('danger');

      for (let i = 0; i < length; i += 1) {
        const file = state.current.rows[key][i];
        const path = window.electronAPI.joinPath(audioPath, file);
        const exists = window.electronAPI.getPathExistence(path);
        if (exists) {
          intents[i] = 'success';
        }
      }

      setState((prev) => {
        return {
          ...prev,
          current: {
            ...prev.current,
            intents: {
              ...prev.current.intents,
              [key]: intents,
            },
          },
        };
      });
    },
    [getColNames, setState, state, getTableLength],
  );

  const isUndoStackEmpty = useMemo(() => {
    return state.past.length === 0;
  }, [state]);

  const isRedoStackEmpty = useMemo(() => {
    return state.future.length === 0;
  }, [state]);

  const undo = useCallback(() => {
    setState((prev) => {
      if (prev.past.length === 0) {
        notify('Undo stack empty', 'primary');
        return prev;
      }

      return {
        current: prev.past[0],
        past: prev.past.slice(1),
        future: [prev.current, ...prev.future].slice(0, 2),
      };
    });
  }, [setState, notify]);

  const redo = useCallback(() => {
    setState((prev) => {
      if (prev.future.length === 0) {
        notify('Redo stack empty', 'primary');
        return prev;
      }

      return {
        current: prev.future[0],
        past: [prev.current, ...prev.past].slice(0, 2),
        future: prev.future.slice(1),
      };
    });
  }, [setState, notify]);

  return {
    state: state.current,
    createColumn,
    renameColumn,
    removeColumn,
    updateRows,
    getColKey,
    getColNames,
    findColumnByName,
    findColumnByIndex,
    findColumnByKey,
    reorder,
    undo,
    redo,
    clearHistory,
    getTableLength,
    updatePathIntents,
    isUndoStackEmpty,
    isRedoStackEmpty,
  };
}
