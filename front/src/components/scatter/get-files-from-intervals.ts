import type {IntervalDetails} from 'src/composables/storage-aggregated-interval-details';

export function getFilesFromIntervals(
  aggregatedIntervalDetails: IntervalDetails[],
  selectedIntervalIndexes: number[],
) {
  let fileIndexes: number[] = [];

  for (let s = 0; s < selectedIntervalIndexes.length; s += 1) {
    const selectedIndex = selectedIntervalIndexes[s];
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
