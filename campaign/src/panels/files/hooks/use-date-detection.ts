import {atom, useAtom} from 'jotai';
import {useCallback, useMemo, useState} from 'react';
import {useTableStateConverter} from 'src/hooks/use-table-state-converter.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';
import {formatDateToString} from 'src/utils/datetime.ts';
import {extractDatesFromPaths} from 'src/utils/paths.ts';

const detectionValueAtom = atom<string>('');

export function useDateDetection() {
  const {getFiles} = useTableStateConverter();
  const {updateRows} = useTableState();

  const files = useMemo(() => getFiles(), [getFiles]);
  const [value, setValue] = useAtom(detectionValueAtom);
  const [results, setResults] = useState<Date[]>([]);

  const update = useCallback(
    (v?: string) => {
      if (v === undefined) {
        return;
      }

      setValue(v);
    },
    [setValue],
  );

  const detect = useCallback(() => {
    const template = value;
    const paths = files.map((f) => f.Path);
    const dates = extractDatesFromPaths(paths, template);
    setResults(dates);
  }, [value, files]);

  const apply = useCallback(() => {
    const strings = results.map((r) => formatDateToString(r));
    updateRows(strings, 2);
  }, [results, updateRows]);

  return {
    value,
    update,
    detect,
    apply,
    results,
    files,
  };
}
