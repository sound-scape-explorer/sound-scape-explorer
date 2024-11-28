import dayjs from 'dayjs';
import {useAtom} from 'jotai';
import {useCallback, useRef} from 'react';
import {rangesAtom} from 'src/atoms.ts';
import {type Range_} from 'src/types.ts';
import {swapNext, swapPrevious} from 'src/utils/array.ts';
import {convertDateToString, convertStringToDate} from 'src/utils/dates.ts';
import {notifyError} from 'src/utils/notifications.ts';

export function useRanges() {
  const [ranges, setRanges] = useAtom(rangesAtom);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const startRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLInputElement | null>(null);

  const resetValues = useCallback(() => {
    if (
      nameRef.current === null ||
      startRef.current === null ||
      endRef.current === null
    ) {
      return;
    }

    nameRef.current.value = '';
    startRef.current.value = convertDateToString();
    endRef.current.value = convertDateToString();
  }, []);

  const add = useCallback(() => {
    if (
      nameRef.current === null ||
      startRef.current === null ||
      endRef.current === null
    ) {
      return;
    }

    const name = nameRef.current.value;
    const start = convertStringToDate(startRef.current.value);
    const end = convertStringToDate(endRef.current.value);

    if (name === '') {
      notifyError('Range name is empty');
      return;
    }

    if (start.unix() >= end.unix()) {
      notifyError('Range start date should be prior to end date');
      return;
    }

    const existing = ranges.find((r) => r.name === name);

    if (existing) {
      notifyError('Range name already exists');
      return;
    }

    const newRange: Range_ = {
      name: nameRef.current.value,
      start: dayjs(startRef.current.value),
      end: dayjs(endRef.current.value),
    };

    const newRanges = [...ranges, newRange];
    setRanges(newRanges);
    resetValues();
  }, [ranges, setRanges, resetValues]);

  const remove = useCallback(
    (range: Range_) => {
      const newRanges = ranges.filter((r) => r !== range);
      setRanges(newRanges);
    },
    [ranges, setRanges],
  );

  const moveUp = useCallback(
    (range: Range_) => {
      const i = ranges.indexOf(range);

      if (i <= 0) {
        return;
      }

      const newRanges = [...ranges];
      swapPrevious(newRanges, i);
      setRanges(newRanges);
    },
    [ranges, setRanges],
  );

  const moveDown = useCallback(
    (range: Range_) => {
      const i = ranges.indexOf(range);

      if (i >= ranges.length - 1) {
        return;
      }

      const newRanges = [...ranges];
      swapNext(newRanges, i);
      setRanges(newRanges);
    },
    [ranges, setRanges],
  );

  return {
    ranges,
    nameRef,
    startRef,
    endRef,
    add,
    remove,
    moveUp,
    moveDown,
  };
}
