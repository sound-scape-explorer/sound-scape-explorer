import {type Scale} from 'chroma-js';
import {type TrajectoryData} from 'src/composables/use-trajectories';

type CyclingPeriod = 'HOUR' | 'DAY' | 'MONTH' | 'COMPLETE';

export function getTrajectoryColors(
  trajectory: TrajectoryData,
  colorScale: Scale,
  cyclingPeriod: CyclingPeriod = 'HOUR',
): string[] {
  let getTimePosition: (timestamp: number) => number;

  switch (cyclingPeriod) {
    case 'HOUR': {
      // hour of the day
      getTimePosition = (timestamp: number) => {
        const date = new Date(timestamp);
        const relativeHour = date.getHours() + date.getMinutes() / 60;
        return relativeHour / 24;
      };
      break;
    }

    case 'DAY': {
      // day of the year (0-365)
      getTimePosition = (timestamp: number) => {
        const date = new Date(timestamp);
        const startOfYear = new Date(date.getFullYear(), 0, 0);
        const diff = timestamp - startOfYear.getTime();
        const dayOfYear = Math.floor(diff / (24 * 60 * 60 * 1000));
        return dayOfYear / 365;
      };
      break;
    }

    case 'MONTH': {
      // month of the year (0-11)
      getTimePosition = (timestamp: number) => {
        const date = new Date(timestamp);
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
      // use the complete timeline
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

  // Calculate colors based on the time position
  return trajectory.timestamps.map((timestamp) => {
    const position = getTimePosition(timestamp);
    return colorScale(position).hex();
  });
}
