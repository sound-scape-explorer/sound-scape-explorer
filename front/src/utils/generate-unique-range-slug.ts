import {type AppRange} from 'src/composables/use-ranges';

export function generateUniqueRangeSlug(range: AppRange): string {
  return `${range.index} - ${range.name}`;
}
