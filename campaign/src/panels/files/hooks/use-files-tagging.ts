import {SITE_AS_TAG_NAME} from '@shared/constants.ts';
import {atom, useAtom} from 'jotai';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useNotify} from 'src/hooks/use-notify';
import {
  type Column,
  useTableState,
} from 'src/panels/files/hooks/use-table-state';
import {
  addPrefixToTagName,
  removePrefixFromTagKey,
  removePrefixFromTagName,
} from 'src/utils/files';

const selectedAtom = atom<Column['name'] | null>(null);

export function useFilesTagging() {
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

  // watch col names for history-based changes
  useEffect(() => {
    if (selected === null) {
      return;
    }

    const prefixed = addPrefixToTagName(selected);
    const names = getColNames();

    if (names.includes(prefixed)) {
      return;
    }

    // clearing because the selected tag no longer exists
    setSelected(null);
  }, [getColNames, selected, setSelected]);

  const names = useMemo(
    () => [
      SITE_AS_TAG_NAME,
      ...state.columns
        .filter((c) => c.type === 'user')
        .map((c) => removePrefixFromTagName(c.name)),
    ],
    [state.columns],
  );

  const uniquesByTagName = useMemo(() => {
    const keysWithPrefix = state.columns
      .filter((c) => c.type === 'user')
      .map((c) => c.key);

    const payload: Record<string, string[]> = {};

    // add site as tag
    payload[SITE_AS_TAG_NAME] = [...new Set(state.rows.col_site)];

    // actual tags
    for (const keyWithPrefix of keysWithPrefix) {
      const name = removePrefixFromTagKey(keyWithPrefix);
      payload[name] = [...new Set(state.rows[keyWithPrefix])];
    }

    return payload;
  }, [state]);

  const add = useCallback(() => {
    if (addInput === '') {
      notify('Tag input cannot be empty', 'danger');
      return;
    }

    if (addInput === SITE_AS_TAG_NAME) {
      notify(`Tag input cannot be ${SITE_AS_TAG_NAME}`, 'danger');
      return;
    }

    const prefixed = addPrefixToTagName(addInput.toUpperCase());
    const names = getColNames();

    if (names.includes(prefixed)) {
      notify('tag name already exists', 'danger');
      return;
    }

    createColumn(prefixed);
    setAddInput('');
  }, [addInput, notify, getColNames, createColumn]);

  const rename = useCallback(() => {
    if (selected === null || editInput === '') {
      return;
    }

    const selectedPrefixed = addPrefixToTagName(selected);
    const editPrefixed = addPrefixToTagName(editInput);
    const column = findColumnByName(selectedPrefixed);
    const names = getColNames();

    if (names.includes(editPrefixed)) {
      notify('tag name already exists', 'danger');
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

    const selectedPrefixed = addPrefixToTagName(selected);
    const column = findColumnByName(selectedPrefixed);
    // purgeLabelFromTrajectories(selected); // todo: ???
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
    names,
    uniquesByTagName,
  };
}
