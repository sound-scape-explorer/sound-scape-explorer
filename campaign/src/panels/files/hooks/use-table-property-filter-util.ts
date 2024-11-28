import {useCallback} from 'react';
import {LABEL_PREFIX} from 'src/constants.ts';
import {type ConfigFile} from 'src/hooks/use-table-state-converter.ts';
import {removePrefixFromLabelProperty} from 'src/utils/files.ts';
import {type IndexedXlsxFile, type XlsxFile} from 'src/utils/xlsx-parser.ts';

export function useTablePropertyFilterUtil() {
  const filterProperties = useCallback(
    (files: (IndexedXlsxFile | ConfigFile)[]) => {
      const keys = Object.keys(files[0]);
      return keys.filter((k) => k.startsWith(LABEL_PREFIX)) as (keyof (
        | XlsxFile
        | ConfigFile
      ))[];
    },
    [],
  );

  const filterPropertiesWithoutPrefix = useCallback(
    (files: (IndexedXlsxFile | ConfigFile)[]) => {
      const keys = Object.keys(files[0]);
      return keys
        .filter((k) => k.startsWith(LABEL_PREFIX))
        .map((p) => removePrefixFromLabelProperty(p));
    },
    [],
  );

  return {
    filterProperties,
    filterPropertiesWithoutPrefix,
  };
}
