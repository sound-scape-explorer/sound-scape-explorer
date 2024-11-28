import {atom, useAtom} from 'jotai/index';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useNotify} from 'src/hooks/use-notify.ts';
import {
  type Column,
  useTableState,
} from 'src/panels/files/hooks/use-table-state.ts';
import {useTrajectoryState} from 'src/panels/metrics/hooks/use-trajectory-state.ts';
import {
  addPrefixToLabelProperty,
  removePrefixFromLabelProperty,
} from 'src/utils/files.ts';

const selectedAtom = atom<Column['name'] | null>(null);

export function useFilesLabels() {
  const [selected, setSelected] = useAtom(selectedAtom);
  const [addInput, setAddInput] = useState('');
  const [editInput, setEditInput] = useState('');
  const {notify} = useNotify();
  const {
    state,
    createColumn,
    renameColumn,
    removeColumn,
    getColNames,
    findColumnByName,
  } = useTableState();
  const {purgeLabelFromTrajectories} = useTrajectoryState();

  // watch col names for history based changes
  useEffect(() => {
    if (selected === null) {
      return;
    }

    const prefixed = addPrefixToLabelProperty(selected);
    const names = getColNames();

    if (names.includes(prefixed)) {
      return;
    }

    // clearing because selected label no longer exists
    setSelected(null);
  }, [getColNames, selected, setSelected]);

  const properties = useMemo(
    () =>
      state.columns
        .filter((c) => c.type === 'user')
        .map((c) => removePrefixFromLabelProperty(c.name)),
    [state.columns],
  );

  const add = useCallback(() => {
    if (addInput === '') {
      return;
    }

    const prefixed = addPrefixToLabelProperty(addInput.toUpperCase());
    const names = getColNames();

    if (names.includes(prefixed)) {
      notify('property already exists', 'danger');
      return;
    }

    createColumn(prefixed);
    setAddInput('');
  }, [addInput, notify, getColNames, createColumn]);

  const rename = useCallback(() => {
    if (selected === null || editInput === '') {
      return;
    }

    const selectedPrefixed = addPrefixToLabelProperty(selected);
    const editPrefixed = addPrefixToLabelProperty(editInput);
    const column = findColumnByName(selectedPrefixed);
    const names = getColNames();

    if (names.includes(editPrefixed)) {
      notify('property already exists', 'danger');
      return;
    }

    renameColumn(column, editInput);
    setSelected(editInput.toUpperCase());
    setEditInput('');
  }, [
    getColNames,
    renameColumn,
    selected,
    setSelected,
    editInput,
    notify,
    findColumnByName,
  ]);

  const remove = useCallback(() => {
    if (selected === null) {
      return;
    }

    const selectedPrefixed = addPrefixToLabelProperty(selected);
    const column = findColumnByName(selectedPrefixed);
    purgeLabelFromTrajectories(selected);
    removeColumn(column);
    setSelected(null);
  }, [selected, removeColumn, setSelected, findColumnByName]);

  return {
    addInput,
    setAddInput,
    editInput,
    setEditInput,
    selected,
    setSelected,
    add,
    rename,
    remove,
    properties,
  };
}
