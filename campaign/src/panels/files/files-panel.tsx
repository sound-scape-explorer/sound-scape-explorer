import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid

import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import {ModuleRegistry} from '@ag-grid-community/core';
import {AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import clsx from 'clsx';
import {useFilesPage} from 'src/hooks/use-files-page.ts';
import styles from 'src/panels/files/files-panel.module.scss';
import {FilesProperties} from 'src/panels/files/files-properties';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export function FilesPanel() {
  const {rows, columns, defaultColDef, handleCellValueChange} = useFilesPage();

  return (
    <div className={styles.container}>
      <FilesProperties />

      <div className={clsx('ag-theme-quartz', styles.grid)}>
        <AgGridReact
          rowData={rows}
          columnDefs={columns}
          rowSelection={{mode: 'multiRow'}}
          defaultColDef={defaultColDef}
          onCellValueChanged={handleCellValueChange}
        />
      </div>
    </div>
  );
}
