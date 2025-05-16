import chroma from 'chroma-js';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useExportName} from 'src/composables/use-export-name';
import {useRelativeTrajectories} from 'src/composables/use-relative-trajectories';
import {
  ExportType,
  LOWER_DECILE_SUFFIX,
  RELATIVE_TRAJECTORIES_FLAVOR,
  UPPER_DECILE_SUFFIX,
} from 'src/constants';
import {ref} from 'vue';
import {z} from 'zod';

const distances = ref<AppPlotProps['values']>([]);
const labels = ref<AppPlotProps['labels']>([]);
const names = ref<string[]>([]);
const colors = ref<string[]>([]);

const RelativeTrajectoryStrategy = z.enum(['overlay', 'continuous']);
// eslint-disable-next-line no-redeclare
type RelativeTrajectoryStrategy = z.infer<typeof RelativeTrajectoryStrategy>;

// todo: move me
const formatTimestamp = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return hours > 0
    ? `${hours}h ${minutes}m`
    : `${minutes}m ${Math.floor(seconds % 60)}s`;
};

// todo: move me
const getTimeOfDay = (timestamp: number) => {
  const date = new Date(timestamp);
  return (
    date.getHours() * 3600000 +
    date.getMinutes() * 60000 +
    date.getSeconds() * 1000 +
    date.getMilliseconds()
  );
};

// todo: move me
const strategy = ref<RelativeTrajectoryStrategy>(
  RelativeTrajectoryStrategy.enum.overlay,
);

export function useRelativeTrajectoriesData() {
  const {filter} = useRelativeTrajectories();
  const {generate} = useExportName();
  const exportName = generate(ExportType.enum.relativeTrajectories);

  const reset = () => {
    distances.value = [];
    labels.value = [];
    names.value = [];
    colors.value = [];
  };

  const handleUpdate = (indices: number[]) => {
    const selected = filter(indices);

    if (selected.length === 0) {
      reset();
      return;
    }

    const newNames: string[] = [];
    const newLabels: string[][] = []; // timestamps
    const newValues: number[][] = []; // series
    const newColors: string[] = [];

    const s = chroma
      .scale(RELATIVE_TRAJECTORIES_FLAVOR)
      .colors(selected.length);

    const allTimestamps = selected.flatMap((rT) => rT.timestamps);
    const minTimestampAll = Math.min(...allTimestamps);

    for (let i = 0; i < selected.length; i += 1) {
      const {trajectory, distances, timestamps, deciles} = selected[i];
      const color = s[i];

      const relativeTimestamps = timestamps.map((t) => {
        if (strategy.value === RelativeTrajectoryStrategy.enum.overlay) {
          return getTimeOfDay(t) / 1000; // seconds since midnight
        } else {
          return (t - minTimestampAll) / 1000;
        }
      });

      const timeStrings = relativeTimestamps.map(formatTimestamp);

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
    distances.value = newValues;
    colors.value = newColors;
  };

  return {
    values: distances,
    labels,
    names,
    colors,
    handleUpdate,
    exportName,
  };
}
