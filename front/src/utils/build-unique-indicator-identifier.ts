import type {AggregatedIndicator} from 'src/composables/use-storage-aggregated-indicators';

export function buildUniqueIndicatorIdentifier(
  aI: AggregatedIndicator,
): string {
  return `${aI.extractor.index} - ${aI.extractor.name}`;
}
