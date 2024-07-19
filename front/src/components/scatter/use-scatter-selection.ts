import {type PlotSelectionEvent} from 'plotly.js-dist-min';
import {useAppNotification} from 'src/app/notification/use-app-notification';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useFiles} from 'src/composables/use-files';
import {useStorageAggregatedIntervalDetails} from 'src/composables/use-storage-aggregated-interval-details';
import {copyToClipboard} from 'src/utils/copy-to-clipboard';
import {generateFilePresenceArray} from 'src/utils/generate-file-presence-array';
import {getFilesFromIntervals} from 'src/utils/get-files-from-intervals';
import {unref} from 'vue';

export function useScatterSelection() {
  const {notify} = useAppNotification();
  const {files} = useFiles();
  const {aggregatedIntervalDetails} = useStorageAggregatedIntervalDetails();
  const {isCopyOnSelect2d} = useClientSettings();

  const handleSelected = async (e: PlotSelectionEvent | undefined) => {
    if (!isCopyOnSelect2d.value) {
      return;
    }

    const details = unref(aggregatedIntervalDetails);

    if (typeof e === 'undefined' || files.value === null || details === null) {
      return;
    }

    const intervalIndexes = e.points.map((point) => point.pointIndex);
    const fileIndexes = getFilesFromIntervals(details, intervalIndexes);
    const table = generateFilePresenceArray(files.value.length, fileIndexes);
    const string = 'selection\n' + table.join('\n');

    await copyToClipboard(string);

    notify(
      'success',
      `${intervalIndexes.length} intervals for ${
        table.filter((v) => v === 'true').length
      } files selected`,
      'Selection copied!',
    );
  };

  return {
    handleSelected: handleSelected,
  };
}
