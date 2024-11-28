import {useCallback} from 'react';
import {type ConfigFile} from 'src/hooks/use-table-state-converter.ts';
import {useTablePropertyFilterUtil} from 'src/panels/files/hooks/use-table-property-filter-util.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';
import {type IndexedXlsxFile} from 'src/utils/xlsx-parser.ts';

export function useTableLabelLoader() {
  const {createColumn} = useTableState();
  const {filterProperties} = useTablePropertyFilterUtil();

  const loadFromXlsx = useCallback(
    (files: IndexedXlsxFile[]) => {
      const properties = filterProperties(files);

      for (const property of properties) {
        const data = new Array<string>(files.length);

        // fill values
        for (let i = 0; i < files.length; i += 1) {
          data[i] = files[i][property];
        }

        // creat col
        createColumn(property, {
          key: `col_${property}`,
          type: 'user',
          data,
        });
      }
    },
    [filterProperties, createColumn],
  );

  const loadFromJson = useCallback(
    (files: ConfigFile[]) => {
      const properties = filterProperties(files);

      for (const property of properties) {
        const data = new Array<string>(files.length);

        // fill values
        for (let i = 0; i < files.length; i += 1) {
          data[i] = files[i][property];
        }

        // creat col
        createColumn(property as string, {
          key: `col_${property}`,
          type: 'user',
          data,
        });
      }
    },
    [filterProperties, createColumn],
  );

  return {
    loadFromXlsx,
    loadFromJson,
  };
}
