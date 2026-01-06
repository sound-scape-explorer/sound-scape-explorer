import {type HotkeyConfig} from '@blueprintjs/core';
import {useTableDelete} from 'src/panels/files/hooks/use-table-delete';
import {useTablePaste} from 'src/panels/files/hooks/use-table-paste';
import {useTableState} from 'src/panels/files/hooks/use-table-state';

export function useTableHotkeys() {
  const {handlePaste} = useTablePaste();
  const {handleDelete} = useTableDelete();
  const {undo, redo} = useTableState();

  const hotkeys: HotkeyConfig[] = [
    {
      combo: 'mod+v',
      label: 'Paste cells',
      group: 'Table',
      stopPropagation: true,
      preventDefault: true,
      onKeyDown: handlePaste,
    },
    {
      combo: 'del',
      label: 'Delete cells',
      group: 'Table',
      stopPropagation: true,
      preventDefault: true,
      onKeyDown: handleDelete,
    },
    {
      combo: 'ctrl+w',
      label: 'Undo',
      group: 'Table',
      stopPropagation: true,
      preventDefault: true,
      onKeyDown: undo,
    },
    {
      combo: 'ctrl+shift+w',
      label: 'Redo',
      group: 'Table',
      stopPropagation: true,
      preventDefault: true,
      onKeyDown: redo,
    },
  ];

  return {
    hotkeys,
  };
}
