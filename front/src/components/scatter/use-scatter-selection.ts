import {copyToClipboard} from '@shared/browser';
import {useAppNotification} from 'src/app/notification/use-app-notification';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useConfig} from 'src/composables/use-config';
import {useIntervals} from 'src/composables/use-intervals';
import {generateFilePresenceArray} from 'src/utils/csv';

export function useScatterSelection() {
  const {notify} = useAppNotification();
  const {config} = useConfig();
  const {intervals} = useIntervals();
  const {isCopyOnSelect2d} = useClientSettings();

  const handleSelected = async () => {
    if (!isCopyOnSelect2d.value) {
      return;
    }

    if (config.value === null) {
      return;
    }

    const fileIndices = intervals.value
      .map((i) => i.files.map((f) => Number(f.Index)))
      .flat();

    const table = generateFilePresenceArray(
      config.value.files.length,
      fileIndices,
    );
    const string = 'selection\n' + table.join('\n');

    await copyToClipboard(string);

    notify(
      'success',
      `${intervals.value.length} intervals for ${
        table.filter((v) => v === 'true').length
      } files selected`,
      'Selection copied!',
    );
  };

  return {
    handleSelected,
  };
}
