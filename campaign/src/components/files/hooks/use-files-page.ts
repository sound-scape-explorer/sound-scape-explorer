import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid

import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {ModuleRegistry} from '@ag-grid-community/core';
import {
  type CellValueChangedEvent,
  type RowDataUpdatedEvent,
} from 'ag-grid-community';
import csv2json from 'csvtojson';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import {useCallback, useEffect, useMemo} from 'react';
import {
  audioFilesColumnsAtom,
  inputFilesAtom,
  jsonFilesAtom,
  outputFilesAtom,
} from 'src/atoms.ts';
import {serializeFilesToGrid} from 'src/utils/serialize-files-to-grid.ts';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export function useFilesPage() {
  const inputFiles = useAtomValue(inputFilesAtom);
  const [rows, setRows] = useAtom(outputFilesAtom);
  const setJsonFiles = useSetAtom(jsonFilesAtom);
  const columns = useAtomValue(audioFilesColumnsAtom);

  // on mounted
  useEffect(() => {
    if (rows.length !== 0) {
      return;
    }

    setRows(serializeFilesToGrid(inputFiles));
  }, [inputFiles, setRows, rows]);

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
      const selectedRows = e.api.getSelectedRows();
      const column = e.colDef.field as string;
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

  // global update handler
  const handleDataUpdate = useCallback(
    async (e: RowDataUpdatedEvent) => {
      const columnKeys = columns.map((column) => column.field);
      const csv = e.api.getDataAsCsv({columnKeys: columnKeys});

      if (typeof csv === 'undefined') {
        return;
      }

      const json = await csv2json().fromString(csv);
      setJsonFiles(json);
    },
    [columns, setJsonFiles],
  );

  return {
    rows,
    columns,
    defaultColDef,
    handleCellValueChange,
    handleDataUpdate,
  };
}
