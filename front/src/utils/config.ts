import {type MetricDto, type RangeDto} from '@shared/dtos';

export function generateUniqueRangeSlug(range: RangeDto) {
  return `${range.index} - ${range.name}`;
}

export function generateUniqueMetricSlug(metric: MetricDto) {
  return `${metric.index} - ${metric.impl}`;
}
