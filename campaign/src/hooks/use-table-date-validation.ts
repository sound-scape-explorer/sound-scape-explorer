import {type Intent} from '@blueprintjs/core';
import {useEffect, useRef} from 'react';
import {useTableLoader} from 'src/panels/files/hooks/use-table-loader.ts';
import {useTableState} from 'src/panels/files/hooks/use-table-state.ts';

export function useTableDateValidation() {
  const {isLoaded} = useTableLoader();
  const {state, setState} = useTableState();
  const prevIntentsRef = useRef<string[] | null>(null);

  const sites = state.rows['col_site'];
  const dates = state.rows['col_date'];

  useEffect(() => {
    if (!isLoaded || !sites || !dates) {
      return;
    }

    const intents = new Array<Intent>(dates.length).fill('success');

    // Find duplicates - single pass with marking
    const siteDateMap = new Map<string, number>();

    for (let i = 0; i < dates.length; i++) {
      const site = sites[i];
      const date = dates[i];
      if (!site || !date) {
        continue;
      }

      const key = `${site}::${date}`;
      const firstIdx = siteDateMap.get(key);

      if (firstIdx !== undefined) {
        intents[firstIdx] = 'danger';
        intents[i] = 'danger';
      } else {
        siteDateMap.set(key, i);
      }
    }

    // Bail if intents haven't changed
    const prev = prevIntentsRef.current;

    if (
      prev &&
      prev.length === intents.length &&
      prev.every((v, i) => v === intents[i])
    ) {
      return;
    }

    prevIntentsRef.current = intents;

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
  }, [isLoaded, sites, dates, setState]);
}
