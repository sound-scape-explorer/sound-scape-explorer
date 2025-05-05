import {
  ContextMenu,
  HotkeysProvider,
  HotkeysTarget2,
  Menu,
  MenuItem,
} from '@blueprintjs/core';
import {Clipboard, Cross, Redo, Undo} from '@blueprintjs/icons';
import {Table2} from '@blueprintjs/table';
import {useMemo} from 'react';
import styles from 'src/panels/files/files-table.module.scss';
import {useTableColumns} from 'src/panels/files/hooks/use-table-columns.tsx';
import {useTableCopy} from 'src/panels/files/hooks/use-table-copy';
import {useTableCurrentCell} from 'src/panels/files/hooks/use-table-current-cell';
import {useTableCurrentSelection} from 'src/panels/files/hooks/use-table-current-selection';
import {useTableDelete} from 'src/panels/files/hooks/use-table-delete';
import {useTableHotkeys} from 'src/panels/files/hooks/use-table-hotkeys';
import {useTablePaste} from 'src/panels/files/hooks/use-table-paste';
import {useTableState} from 'src/panels/files/hooks/use-table-state';
import {useTableWidths} from 'src/panels/files/hooks/use-table-widths';

export function FilesTable() {
  const {columns} = useTableColumns();
  const {widths} = useTableWidths();
  const {handleCopy} = useTableCopy();
  const {hotkeys} = useTableHotkeys();
  const {handleDelete} = useTableDelete();
  const {handlePaste} = useTablePaste();
  const {handleFocus} = useTableCurrentCell();
  const {handleSelection} = useTableCurrentSelection();
  const {
    reorder,
    getTableLength,
    undo,
    redo,
    isUndoStackEmpty,
    isRedoStackEmpty,
  } = useTableState();

  const length = useMemo(() => getTableLength(), [getTableLength]);

  return (
    <ContextMenu
      content={
        <Menu>
          <MenuItem
            onClick={handleDelete}
            icon={<Cross />}
            text="Clear"
          />
          <MenuItem
            onClick={handlePaste}
            icon={<Clipboard />}
            text="Paste"
          />
          <MenuItem
            onClick={undo}
            disabled={isUndoStackEmpty}
            icon={<Undo />}
            text="Undo"
          />
          <MenuItem
            onClick={redo}
            disabled={isRedoStackEmpty}
            icon={<Redo />}
            text="Redo"
          />
        </Menu>
      }
    >
      <HotkeysProvider>
        <HotkeysTarget2 hotkeys={hotkeys}>
          {({handleKeyDown, handleKeyUp}) => (
            <div
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
            >
              <Table2
                className={styles.table}
                numRows={length}
                columnWidths={widths}
                numFrozenColumns={2}
                cellRendererDependencies={[columns]}
                getCellClipboardData={handleCopy}
                enableFocusedCell={true}
                onFocusedCell={handleFocus}
                onSelection={handleSelection}
                enableColumnReordering
                onColumnsReordered={reorder}
              >
                {columns}
              </Table2>
            </div>
          )}
        </HotkeysTarget2>
      </HotkeysProvider>
    </ContextMenu>
  );
}
