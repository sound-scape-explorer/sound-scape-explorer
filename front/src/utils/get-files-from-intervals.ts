import type {IntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';

export function getFilesFromIntervals(
  aggregatedIntervalDetails: IntervalDetails[],
  selectedIntervalIndexes: number[],
) {
  let fileIndexes: number[] = [];

  for (const selectedIndex of selectedIntervalIndexes) {
    const details = aggregatedIntervalDetails[selectedIndex];

    for (const d of details) {
      if (fileIndexes.indexOf(d.fileIndex) !== -1) {
        continue;
      }

      fileIndexes = [...fileIndexes, d.fileIndex];
    }
  }

  return fileIndexes;
}
