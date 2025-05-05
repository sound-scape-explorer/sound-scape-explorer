import {type ExtractorDto, type MetricDto, type RangeDto} from '@shared/dtos';
import {type IndexDto} from '@shared/dtosOLD';

export function generateUniqueRangeSlug(range: RangeDto) {
  return `${range.index} - ${range.name}`;
}

export function generateUniqueMetricSlug(metric: MetricDto) {
  return `${metric.index} - ${metric.impl}`;
}

export function generateUniqueExtractorSlug(ex: ExtractorDto) {
  return `${ex.index} - ${ex.name}`;
}

export function generateUniqueIndexSlug(index: IndexDto) {
  return `${index.index} - ${index.impl}`;
}
