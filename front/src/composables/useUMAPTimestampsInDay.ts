import {ref} from 'vue';
import {useConfig} from './useConfig';
import {fastTimeInDay} from '../utils/fast-time-in-day';
import {UMAPDatasetStore} from '../store/UMAP-dataset.store';

export function useUMAPTimestampsInDay() {
  const timestampsInDay = ref<number[]>([]);

  function parseTimestamps() {
    const {dataset} = UMAPDatasetStore;

    if (!dataset) {
      throw new Error('Dataset is not defined');
    }

    return dataset.metadata.map((entry) => {
      return entry.timestamp;
    });
  }

  async function updateTimestampsInDay() {
    const config = await useConfig();
    const locale = config.config?.variables.display_locale;

    if (!locale) {
      throw new Error('`display_locale` in configuration file is not defined');
    }

    const timestamps = parseTimestamps();

    timestampsInDay.value = timestamps.map(fastTimeInDay(locale)); // from 0 to 24;
  }

  return {
    timestampsInDay,
    updateTimestampsInDay,
  };
}
