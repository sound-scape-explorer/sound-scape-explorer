import {type Scale} from 'chroma-js';
import {
  CyclingPeriod,
  useScatterTrajectoryCyclingPeriod,
} from 'src/components/scatter/use-scatter-trajectory-cycling-period';
import {useDateTime} from 'src/composables/use-date-time';
import {type TrajectoryDtoWithData} from 'src/composables/use-trajectories';

export function useScatterTrajectoryColors() {
  const {cyclingPeriod} = useScatterTrajectoryCyclingPeriod();
  const {timestampToDate, getTime} = useDateTime();

  /**
   * Calculates colors for trajectory points based on the current cycling period.
   * @param trajectory The trajectory data.
   * @param colorScale The chroma-js color scale.
   * @returns An array of hex color strings.
   */
  const getColors = (
    trajectory: TrajectoryDtoWithData,
    colorScale: Scale,
  ): string[] => {
    let getTimePosition: (timestamp: number) => number;

    switch (cyclingPeriod.value) {
      case CyclingPeriod.enum.HOUR: {
        getTimePosition = (timestamp: number) => {
          const date = timestampToDate(timestamp);
          const {hours} = getTime(date);
          const relativeHour = hours + date.getMinutes() / 60;
          return relativeHour / 24;
        };
        break;
      }

      case CyclingPeriod.enum.DAY: {
        getTimePosition = (timestamp: number) => {
          const date = timestampToDate(timestamp);
          const startOfYear = new Date(date.getFullYear(), 0, 0);
          const diff = timestamp - startOfYear.getTime();
          const dayOfYear = Math.floor(diff / (24 * 60 * 60 * 1000));
          return dayOfYear / 365; // Assuming 365 days for position mapping
        };
        break;
      }

      case CyclingPeriod.enum.MONTH: {
        getTimePosition = (timestamp: number) => {
          const date = timestampToDate(timestamp);
          const month = date.getMonth();
          const dayOfMonth = date.getDate();
          const daysInMonth = new Date(
            date.getFullYear(),
            month + 1,
            0,
          ).getDate();

          const relativeMonth = month + dayOfMonth / daysInMonth;
          return relativeMonth / 12;
        };
        break;
      }

      default: {
        // Use the complete timeline for coloring
        const minTime = Math.min(...trajectory.timestamps);
        const maxTime = Math.max(...trajectory.timestamps);
        const duration = maxTime - minTime;

        getTimePosition = (timestamp: number) => {
          if (duration <= 0) {
            return 0;
          }
          const relativeTimestamp = timestamp - minTime;
          return relativeTimestamp / duration;
        };
        break;
      }
    }

    return trajectory.timestamps.map((timestamp) => {
      const position = getTimePosition(timestamp);
      return colorScale(position).hex();
    });
  };

  return {
    getColors,
  };
}
