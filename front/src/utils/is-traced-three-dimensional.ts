import {type Traced} from 'src/composables/use-trajectories-data';

export function isTracedThreeDimensional(traced: Traced): boolean {
  return traced.data[0].length === 3;
}
