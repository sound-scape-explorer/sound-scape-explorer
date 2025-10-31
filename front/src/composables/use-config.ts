import {formatDateToString} from '@shared/dates';
import {ConfigDto, type RangeDto} from '@shared/dtos';
import {max, min} from 'date-fns';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {ref} from 'vue';

const config = ref<ConfigDto | null>(null);
const isLoaded = ref<boolean>(false);

const nyquist = ref<number>(0);

export function useConfig() {
  const {read: r} = useStorageReader();

  const extendRangeWithFullCampaign = (c: ConfigDto): ConfigDto => {
    const dates = c.files.map((f) => new Date(f.Date));
    const earliest = min(dates);
    const latest = max(dates);

    const rangeIndices = c.ranges.map((r) => r.index);
    const hasNoRange = rangeIndices.length === 0;
    const newRangeIndex = hasNoRange ? 0 : Math.min(...rangeIndices) - 1;

    const newRange: RangeDto = {
      index: newRangeIndex,
      name: '__FULL',
      start: formatDateToString(earliest),
      end: formatDateToString(latest),
    };

    const extendedConfig: ConfigDto = {
      ...c,
      ranges: [newRange, ...c.ranges],
    };

    return extendedConfig;
  };

  const read = async () => {
    await r(async (worker, file) => {
      const string = await worker.readConfigString(file);
      const json = JSON.parse(string);
      const newConfig = ConfigDto.parse(json);
      const extendedConfig = extendRangeWithFullCampaign(newConfig);
      config.value = extendedConfig;
      nyquist.value = config.value.settings.expectedSampleRate * 0.5;
      isLoaded.value = true;
    });
  };

  return {
    read,
    config,
    isLoaded,
    nyquist,
  };
}
