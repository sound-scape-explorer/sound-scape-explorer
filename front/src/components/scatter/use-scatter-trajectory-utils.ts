import {type Data} from 'plotly.js-dist-min';
import {type TrajectoryDtoWithData} from 'src/composables/use-trajectories';
import {TRACE_WIDTH_2D, TRACE_WIDTH_3D} from 'src/constants';

type GenerateTraceDefaultDataOptions = Pick<
  Data,
  'type' & 'mode' & 'opacity' & 'line'
>;

export function useScatterTrajectoryUtils() {
  const isTrajectory3d = (trajectory: TrajectoryDtoWithData): boolean => {
    return trajectory.path[0].length === 3;
  };

  const getDefaultScatterOptions = (
    isThreeDimensional: boolean,
    colors: string[],
  ): GenerateTraceDefaultDataOptions => {
    const scatterType = isThreeDimensional ? 'scatter3d' : 'scatter';

    return {
      type: scatterType,
      mode: 'lines',
      opacity: 0.8,
      line: {
        color: colors,
        width: isThreeDimensional ? TRACE_WIDTH_3D : TRACE_WIDTH_2D,
      },
    };
  };

  return {
    isTrajectory3d,
    getDefaultScatterOptions,
  };
}
