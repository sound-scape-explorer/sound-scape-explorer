import {CyclingPeriod} from 'src/components/scatter/use-scatter-trajectory-cycling-period';
import {useDateTime} from 'src/composables/use-date-time';

const referenceDate = new Date('1970-01-01T00:00:00'); // Consistent reference date

// todo: need to check with new date time behaviours
export function useAppGradient() {
  const {getTime} = useDateTime();

  /**
   * Generates labels for the gradient map based on the current cycling period.
   * @param size The number of labels to generate.
   * @param cyclingPeriod The time period to generate from.
   * @returns An array of formatted string labels.
   */
  const getLabels = (
    size: number,
    cyclingPeriod: CyclingPeriod = CyclingPeriod.enum.HOUR,
  ): string[] => {
    const labels: string[] = [];

    switch (cyclingPeriod) {
      case CyclingPeriod.enum.HOUR: {
        const totalDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const interval = totalDuration / size;

        for (let i = 0; i < size; i++) {
          const currentDate = new Date(referenceDate.getTime() + i * interval);
          const {hours} = getTime(currentDate);
          // const hours = currentDate.getHours().toString().padStart(2, '0');
          const minutes = currentDate.getMinutes().toString().padStart(2, '0');
          labels.push(`${hours}:${minutes}`);
        }
        break;
      }

      case CyclingPeriod.enum.DAY: {
        const totalDaysInYear = 365; // Assuming a non-leap year for simplicity
        const interval = totalDaysInYear / size;

        for (let i = 0; i < size; i++) {
          const dayOfYear = Math.floor(i * interval);
          const date = new Date(referenceDate.getFullYear(), 0, dayOfYear + 1);
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          labels.push(`${month}/${day}`);
        }
        break;
      }

      case CyclingPeriod.enum.MONTH: {
        const totalMonthsInYear = 12;
        const interval = totalMonthsInYear / size;

        for (let i = 0; i < size; i++) {
          const monthIndex = Math.floor(i * interval);
          const date = new Date(referenceDate.getFullYear(), monthIndex, 1);
          labels.push(date.toLocaleString('en-US', {month: 'short'}));
        }
        break;
      }

      default:
        // For the 'default' case (complete timeline), labels are tricky without min/max timestamps.
        // A simple numerical sequence or empty array is a fallback.
        for (let i = 0; i < size; i++) {
          labels.push(`${i + 1}`);
        }
        break;
    }

    return labels;
  };

  /**
   * Provides legend labels based on the current cycling period.
   * @param cyclingPeriod The time period to generate from.
   * @returns An object with legend min, med, and max labels.
   */
  const getLegendLabels = (
    cyclingPeriod: CyclingPeriod = CyclingPeriod.enum.HOUR,
  ) => {
    let min: string;
    let med: string;
    let max: string;

    switch (cyclingPeriod) {
      case CyclingPeriod.enum.HOUR:
        min = '00:00';
        med = '12:00';
        max = '00:00';
        break;
      case CyclingPeriod.enum.DAY:
        min = '01/01'; // Jan 1st
        med = '07/02'; // Approx July 2nd
        max = '12/31'; // Dec 31st
        break;
      case CyclingPeriod.enum.MONTH:
        min = 'Jan';
        med = 'Jul';
        max = 'Dec';
        break;
      default:
        min = 'Start';
        med = 'Mid';
        max = 'End';
        break;
    }
    return {min, med, max};
  };

  return {
    getLabels,
    getLegendLabels,
  };
}
