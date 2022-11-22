import {mapRange} from './map-range';
import {PREGENERATED_HUES_LENGTH} from '../constants';

export function mapColorRange(index: number, length: number): number {
  return Number(mapRange(index, 0, length, 0, PREGENERATED_HUES_LENGTH).toFixed(0));
}
