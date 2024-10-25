import {type AppRange} from 'src/composables/use-storage-ranges';

export function generateUniqueRangeSlug(range: AppRange): string {
  return `${range.index} - ${range.name}`;
}
