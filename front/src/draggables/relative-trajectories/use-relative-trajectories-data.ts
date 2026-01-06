import chroma from 'chroma-js';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useDateTime} from 'src/composables/use-date-time';
import {useExportName} from 'src/composables/use-export-name';
import {useRelativeTrajectories} from 'src/composables/use-relative-trajectories';
import {
  ExportType,
  LOWER_DECILE_SUFFIX,
  RELATIVE_TRAJECTORIES_FLAVOR,
  UPPER_DECILE_SUFFIX,
} from 'src/constants';
import {
  RelativeTrajectoryStrategy,
  useRelativeTrajectoriesStrategy,
} from 'src/draggables/relative-trajectories/use-relative-trajectories-strategy';
import {ref} from 'vue';

const values = ref<AppPlotProps['values']>([]);
const labels = ref<AppPlotProps['labels']>([]);
const names = ref<string[]>([]);
const colors = ref<string[]>([]);

export function useRelativeTrajectoriesData() {
  const {filter} = useRelativeTrajectories();
  const {generate} = useExportName();
  const {strategy} = useRelativeTrajectoriesStrategy();
  const {timestampToDate, getTime} = useDateTime();
  const exportName = generate(ExportType.enum.relativeTrajectories);

  const formatTimestamp = (
    timestampMs: number, // Original timestamp in milliseconds
    strategy: RelativeTrajectoryStrategy,
    minGlobalTimestampMs?: number, // Only needed for continuous strategy
  ): string => {
    const date = timestampToDate(timestampMs);
    const {hours, minutes, seconds} = getTime(date);

    const pad = (num: number): string => num.toString().padStart(2, '0');

    const timeOfDayString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    if (strategy === RelativeTrajectoryStrategy.enum.overlay) {
      // For overlay, return the time of day string
      return timeOfDayString;
    }

    // For continuous, calculate day offset
    if (minGlobalTimestampMs === undefined) {
      return timeOfDayString; // Fallback
    }

    const MS_IN_DAY = 86400000; // 24 * 60 * 60 * 1000
    const totalElapsedMs = timestampMs - minGlobalTimestampMs;
    const days = Math.floor(totalElapsedMs / MS_IN_DAY);

    if (days > 0) {
      return `${days}d ${timeOfDayString}`;
    }

    // If within the first "day" of the continuous period, just show the time of day
    return timeOfDayString;
  };

  const reset = () => {
    values.value = [];
    labels.value = [];
    names.value = [];
    colors.value = [];
  };

  const handleUpdate = (relativeTrajectoryIndices: number[]) => {
    const selected = filter(relativeTrajectoryIndices);

    if (selected.length === 0) {
      reset();
      return;
    }

    const newNames: string[] = [];
    const newLabels: string[][] = []; // this will hold the formatted timestamp strings
    const newValues: number[][] = []; // this will hold the numeric data for plotting (Y values)
    const newColors: string[] = [];

    const s = chroma
      .scale(RELATIVE_TRAJECTORIES_FLAVOR)
      .colors(selected.length);

    const allTimestamps = selected.flatMap((rT) => rT.timestamps);
    const minTimestampAll = Math.min(...allTimestamps); // milliseconds

    for (let i = 0; i < selected.length; i += 1) {
      const {trajectory, distances, timestamps, deciles} = selected[i];
      const color = s[i];
      const timeStrings: string[] = [];

      for (const t of timestamps) {
        if (strategy.value === RelativeTrajectoryStrategy.enum.overlay) {
          timeStrings.push(formatTimestamp(t, strategy.value));
        } else {
          timeStrings.push(formatTimestamp(t, strategy.value, minTimestampAll));
        }
      }

      newNames.push(trajectory.name);
      newLabels.push(timeStrings);
      newValues.push(distances);
      newColors.push(color);

      if (deciles === null) {
        continue;
      }

      const lowerDeciles = deciles.map((d) => d[0]);
      const upperDeciles = deciles.map((d) => d[1]);

      newNames.push(`${trajectory.name}${LOWER_DECILE_SUFFIX}`);
      newLabels.push(timeStrings);
      newValues.push(lowerDeciles);
      newColors.push(color);

      newNames.push(`${trajectory.name}${UPPER_DECILE_SUFFIX}`);
      newLabels.push(timeStrings);
      newValues.push(upperDeciles);
      newColors.push(color);
    }

    names.value = newNames;
    labels.value = newLabels;
    values.value = newValues;
    colors.value = newColors;
  };

  return {
    values,
    labels,
    names,
    colors,
    handleUpdate,
    exportName,
  };
}
