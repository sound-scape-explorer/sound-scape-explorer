import {type IntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {
  type DigesterDtoWithType,
  type ExtractorDto,
  type IndexDto,
  type RangeDto,
} from 'src/dtos';

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

export function generateUniqueRangeSlug(range: RangeDto) {
  return `${range.index} - ${range.name}`;
}

export function generateUniqueDigesterSlug(digester: DigesterDtoWithType) {
  return `${digester.index} - ${digester.impl}`;
}

export function generateUniqueExtractorSlug(ex: ExtractorDto) {
  return `${ex.index} - ${ex.name}`;
}

export function generateUniqueIndexSlug(index: IndexDto) {
  return `${index.index} - ${index.impl}`;
}
