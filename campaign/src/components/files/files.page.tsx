import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid

import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {ModuleRegistry} from '@ag-grid-community/core';
import {AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import clsx from 'clsx';
import styles from 'src/components/files/files.page.module.scss';
import {FilesProperties} from 'src/components/files/files-properties.tsx';
import {useFilesPage} from 'src/components/files/hooks/use-files-page.ts';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export function FilesPage() {
  const {
    rows,
    columns,
    defaultColDef,
    handleCellValueChange,
    handleDataUpdate,
  } = useFilesPage();

  return (
    <div className={styles.container}>
      <FilesProperties />

      <div className={clsx('ag-theme-quartz', styles.grid)}>
        <AgGridReact
          rowData={rows}
          columnDefs={columns}
          rowSelection={{mode: 'multiRow'}}
          defaultColDef={defaultColDef}
          tooltipShowDelay={200}
          onCellValueChanged={handleCellValueChange}
          onRowDataUpdated={handleDataUpdate}
        />
      </div>
    </div>
  );
}
