import {useCallback, useMemo} from 'react';
import {
  type ColumnKey,
  useTableState,
} from 'src/panels/files/hooks/use-table-state.ts';

export function useFileValidation() {
  const {state} = useTableState();

  const isStateValid = useCallback(
    (key: ColumnKey) => {
      let isValid = true;

      const intents = state.intents[key];

      for (const intent of intents) {
        if (intent !== 'success') {
          isValid = false;
          break;
        }
      }

      return isValid;
    },
    [state.intents],
  );

  const arePathsValid = useMemo(() => isStateValid('col_path'), [isStateValid]);
  const areDatesValid = useMemo(() => isStateValid('col_date'), [isStateValid]);

  const isValid = useMemo(
    () => arePathsValid && areDatesValid,
    [arePathsValid, areDatesValid],
  );

  return {
    isValid,
    arePathsValid,
    areDatesValid,
  };
}
