import {type Digester} from 'src/composables/use-digesters';
import {type Extractor} from 'src/composables/use-extractors';
import {type IntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {type AppRange} from 'src/composables/use-storage-ranges';

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

export function generateUniqueRangeSlug(range: AppRange): string {
  return `${range.index} - ${range.name}`;
}

export function generateUniqueDigesterSlug(digester: Digester): string {
  return `${digester.index} - ${digester.name}`;
}

export function generateUniqueExtractorSlug(extractor: Extractor): string {
  return `${extractor.index} - ${extractor.name}`;
}
