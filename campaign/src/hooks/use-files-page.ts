import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid

import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {ModuleRegistry} from '@ag-grid-community/core';
import {type CellValueChangedEvent} from 'ag-grid-community';
import {useAtom, useAtomValue} from 'jotai';
import {useCallback, useMemo} from 'react';
import {gridColumnsAtom, gridRowsAtom} from 'src/atoms.ts';
import {type GridRow} from 'src/types.ts';
import {addPrefixToLabelProperty} from 'src/utils/files.ts';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export function useFilesPage() {
  const [rows, setRows] = useAtom(gridRowsAtom);
  const columns = useAtomValue(gridColumnsAtom);

  const defaultColDef = useMemo(
    () => ({
      flex: 1,
      editable: false,
      sortable: false,
    }),
    [],
  );

  // multiple row editing
  const handleCellValueChange = useCallback(
    (e: CellValueChangedEvent) => {
      const column = e.colDef.field as string;
      const selectedRows = e.api.getSelectedRows();

      const value = e.value;
      const newRows = [...rows];

      for (const selectedRow of selectedRows) {
        const index = selectedRow.index as number;
        // @ts-expect-error: lazy typing
        newRows[index][column] = value;
      }

      setRows(newRows);
    },
    [rows, setRows],
  );

  const renameRows = useCallback(
    (currentProperty: string, renamedProperty: string) => {
      const renamedRows = rows.map((file) => {
        const prefixedCurrentProperty =
          addPrefixToLabelProperty(currentProperty);
        const prefixedRenamedProperty =
          addPrefixToLabelProperty(renamedProperty);

        const renamedFile: GridRow = {
          ...file,
          // @ts-expect-error extending grid base definition
          [prefixedRenamedProperty]: file[prefixedCurrentProperty],
        };

        // @ts-expect-error same as above, not documented
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete renamedFile[prefixedCurrentProperty];

        return renamedFile;
      });

      setRows(renamedRows);
      console.log(renamedRows[0]);
    },
    [rows, setRows],
  );

  return {
    rows,
    renameRows,
    columns,
    defaultColDef,
    handleCellValueChange,
  };
}
