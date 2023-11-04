import {type Traced} from 'src/hooks/useTraced';

export function isTracedThreeDimensional(traced: Traced): boolean {
  return traced.data[0].length === 3;
}
