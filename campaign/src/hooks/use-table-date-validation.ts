import {useEffect} from 'react';
import {useTableLoader} from 'src/panels/files/hooks/use-table-loader.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';

export function useTableDateValidation() {
  const {isLoaded} = useTableLoader();
  const {state, setState} = useTableState();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const sites = state.rows['col_site'];
    const dates = state.rows['col_date'];

    if (!sites || !dates) {
      return;
    }

    const intents = new Array(dates.length).fill('success');

    // Find duplicates
    const siteDateMap = new Map<string, number[]>();
    dates.forEach((date, idx) => {
      const site = sites[idx];
      if (!site || !date) {
        return;
      }

      const key = `${site}::${date}`;
      const indices = siteDateMap.get(key);
      if (indices) {
        indices.push(idx);
      } else {
        siteDateMap.set(key, [idx]);
      }
    });

    // Mark duplicates as danger
    for (const indices of siteDateMap.values()) {
      if (indices.length > 1) {
        indices.forEach((idx) => (intents[idx] = 'danger'));
      }
    }

    setState((prev) => ({
      ...prev,
      current: {
        ...prev.current,
        intents: {
          ...prev.current.intents,
          col_date: intents,
        },
      },
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, state.rows]);
}
