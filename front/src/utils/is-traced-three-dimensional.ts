import {type Traced} from 'src/composables/trajectories-data';

export function isTracedThreeDimensional(traced: Traced): boolean {
  return traced.data[0].length === 3;
}
