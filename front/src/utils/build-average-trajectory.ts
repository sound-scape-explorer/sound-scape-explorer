import type {Traced} from 'src/composables/use-trajectories-data';

import {interpolateArray} from './interpolate-array';
import {isTracedThreeDimensional} from './is-traced-three-dimensional';
import {sumArraysIndexWise} from './sum-arrays-index-wise';

export function buildAverageTrajectory(traceds: Traced[]) {
  const isThreeDimensional = isTracedThreeDimensional(traceds[0]);

  interface IData {
    x: number[];
    y: number[];
    z: number[];
  }

  let longestTraced: Traced = traceds[0];

  const data: IData[] = [];

  // Pick the longest trajectory
  for (const traced of traceds) {
    if (traced.data.length > longestTraced.data.length) {
      longestTraced = traced;
    }
  }

  const length = longestTraced.data.length;

  // Interpolating
  for (const traced of traceds) {
    const d = {} as IData;
    d.x = traced.data.map((coords) => coords[0]);
    d.y = traced.data.map((coords) => coords[1]);
    if (isThreeDimensional) {
      d.z = traced.data.map((coords) => coords[2]);
    }

    if (d.x.length < length) {
      d.x = interpolateArray(d.x, length);
      d.y = interpolateArray(d.y, length);
      if (isThreeDimensional) {
        d.z = interpolateArray(d.z, length);
      }
    }

    data.push(d);
  }

  const payload = {
    x: sumArraysIndexWise({
      arrays: data.map((data) => data.x),
      doAveraging: true,
    }),
    y: sumArraysIndexWise({
      arrays: data.map((data) => data.y),
      doAveraging: true,
    }),
    z: isThreeDimensional
      ? sumArraysIndexWise({
          arrays: data.map((data) => data.z),
          doAveraging: true,
        })
      : undefined,
  };

  return {
    data: payload,
    traced: longestTraced,
    isThreeDimensional: isThreeDimensional,
  };
}
