import {type RangeDto} from '@shared/dtos.ts';
import {addHours} from 'date-fns';
import {atom, useAtom} from 'jotai';
import {useCallback} from 'react';
import {formatDateToString, getToday} from 'src/utils/dates.ts';

const rangesAtom = atom<RangeDto[]>([]);

export function useRangeState() {
  const [ranges, setRanges] = useAtom(rangesAtom);

  const addRange = useCallback(() => {
    setRanges((prev) => {
      const newRanges = [...prev];
      newRanges.push({
        index: prev.length,
        name: '',
        start: formatDateToString(getToday()),
        end: formatDateToString(addHours(getToday(), 1)),
      });
      return newRanges;
    });
  }, [setRanges]);

  const deleteRange = useCallback(
    (range: RangeDto) => {
      setRanges((prev) => {
        const newRanges = prev.filter((r) => r.index !== range.index);
        newRanges.forEach((r, index) => {
          r.index = index;
        });
        return newRanges;
      });
    },
    [setRanges],
  );

  const updateIndex = useCallback(
    (range: RangeDto, index: number) => {
      setRanges((prev) => {
        const newRanges = [...prev];
        const newIndex = range.index + index;

        if (newIndex < 0 || newIndex >= prev.length) {
          return newRanges;
        }

        const existing = newRanges.find((r) => r.index === newIndex);
        const updated = newRanges.find((r) => r.index === range.index);

        if (existing && updated) {
          existing.index = range.index;
          updated.index = newIndex;
        }

        return newRanges;
      });
    },
    [setRanges],
  );

  const updateName = useCallback(
    (range: RangeDto, name: string) => {
      setRanges((prev) => {
        const newRanges = [...prev];
        const existing = newRanges.find((r) => r.index === range.index);
        if (existing) {
          existing.name = name;
        }
        return newRanges;
      });
    },
    [setRanges],
  );

  const updateStart = useCallback(
    (range: RangeDto, start: string) => {
      setRanges((prev) => {
        const newRanges = [...prev];
        const existing = newRanges.find((r) => r.index === range.index);
        if (existing) {
          existing.start = start;
        }
        return newRanges;
      });
    },
    [setRanges],
  );

  const updateEnd = useCallback(
    (range: RangeDto, end: string) => {
      setRanges((prev) => {
        const newRanges = [...prev];
        const existing = newRanges.find((r) => r.index === range.index);
        if (existing) {
          existing.end = end;
        }
        return newRanges;
      });
    },
    [setRanges],
  );

  return {
    ranges,
    setRanges,
    addRange,
    deleteRange,
    updateIndex,
    updateName,
    updateStart,
    updateEnd,
  };
}
