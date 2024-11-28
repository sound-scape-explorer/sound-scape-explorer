import {HotkeysProvider, HotkeysTarget2} from '@blueprintjs/core';
import {Table2} from '@blueprintjs/table';
import {useMemo} from 'react';
import styles from 'src/panels/files/files-table.module.scss';
import {useTableColumns} from 'src/panels/files/hooks/use-table-columns.tsx';
import {useTableCopy} from 'src/panels/files/hooks/use-table-copy.ts';
import {useTableCurrentCell} from 'src/panels/files/hooks/use-table-current-cell.ts';
import {useTableCurrentSelection} from 'src/panels/files/hooks/use-table-current-selection.ts';
import {useTableHotkeys} from 'src/panels/files/hooks/use-table-hotkeys.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';
import {useTableWidths} from 'src/panels/files/hooks/use-table-widths.ts';

export function FilesTable() {
  const {columns} = useTableColumns();
  const {widths} = useTableWidths();
  const {handleCopy} = useTableCopy();
  const {hotkeys} = useTableHotkeys();
  const {handleFocus} = useTableCurrentCell();
  const {handleSelection} = useTableCurrentSelection();
  const {reorder, getTableLength} = useTableState();

  const length = useMemo(() => getTableLength(), [getTableLength]);

  return (
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
  );
}
