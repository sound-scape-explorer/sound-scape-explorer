import {ConfigDto} from '@shared/dtos';
import {useConfigRangeExtension} from 'src/composables/use-config-range-extension';
import {useNyquist} from 'src/composables/use-nyquist';
import {useStorageReader} from 'src/composables/use-storage-reader';
import {useTimezone} from 'src/composables/use-timezone';
import {hashString} from 'src/utils/hash';
import {ref} from 'vue';

const config = ref<ConfigDto | null>(null);
const checksum = ref<string | null>(null);
const isLoaded = ref<boolean>(false);

export function useConfig() {
  const {read: r} = useStorageReader();
  const {extend} = useConfigRangeExtension();
  const {set: setNyquist} = useNyquist();
  const {set: setTimezone} = useTimezone();

  const read = async () => {
    await r(async (worker, file) => {
      const string = await worker.readConfigString(file);
      const json = JSON.parse(string);
      const newConfig = ConfigDto.parse(json);
      const extendedConfig = extend(newConfig);
      config.value = extendedConfig;
      setTimezone(config.value.settings.timezone);
      setNyquist(config.value.settings.expectedSampleRate);
      isLoaded.value = true;

      checksum.value = await hashString(string);
    });
  };

  return {
    read,
    config,
    checksum,
    isLoaded,
  };
}
