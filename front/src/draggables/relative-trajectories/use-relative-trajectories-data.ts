import chroma from 'chroma-js';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useExportName} from 'src/composables/use-export-name';
import {useRelativeTrajectories} from 'src/composables/use-relative-trajectories';
import {
  LOWER_QUARTILE_SUFFIX,
  RELATIVE_TRAJECTORIES_FLAVOR,
  UPPER_QUARTILE_SUFFIX,
} from 'src/constants';
import {ref} from 'vue';

const values = ref<AppPlotProps['values']>([]);
const labels = ref<AppPlotProps['labels']>([]);
const names = ref<string[]>([]);
const colors = ref<string[]>([]);

export function useRelativeTrajectoriesData() {
  const {selectRelativeTrajectories} = useRelativeTrajectories();
  const {generate} = useExportName();
  const exportName = generate('relative-trajectories');

  const reset = () => {
    values.value = [];
    labels.value = [];
    names.value = [];
    colors.value = [];
  };

  const handleUpdate = (indices: number[]) => {
    const selected = selectRelativeTrajectories(indices);

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

    for (let i = 0; i < selected.length; i += 1) {
      const {name, timestamps, quartiles, values: v} = selected[i];
      const color = s[i];
      const ts = timestamps.map((t) => t.toString());

      newNames.push(name);
      newLabels.push(ts);
      newValues.push(v);
      newColors.push(color);

      if (quartiles === null) {
        continue;
      }

      newNames.push(`${name}${LOWER_QUARTILE_SUFFIX}`);
      newLabels.push(ts);
      newValues.push(quartiles.map((q) => q[0]));
      newColors.push(color);

      newNames.push(`${name}${UPPER_QUARTILE_SUFFIX}`);
      newLabels.push(ts);
      newValues.push(quartiles.map((q) => q[1]));
      newColors.push(color);
    }

    names.value = newNames;
    labels.value = newLabels;
    values.value = newValues;
    colors.value = newColors;
  };

  return {
    values: values,
    labels: labels,
    names: names,
    colors: colors,
    handleUpdate: handleUpdate,
    exportName: exportName,
  };
}
