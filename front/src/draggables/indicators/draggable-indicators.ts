import {Csv} from 'src/common/csv';
import {useDate} from 'src/composables/date';
import {useStorageAggregatedIndicators} from 'src/composables/storage-aggregated-indicators';
import {useIndicators} from 'src/draggables/indicators/indicators';
import {convertToNaiveSelectOptions} from 'src/utils/convert-to-naive-select-options';
import {computed, ref} from 'vue';

const currentIndicator = ref();
const isSelection = ref<boolean>(false);
const isCandles = ref<boolean>(false);
const isCondensed = ref<boolean>(true);

export function useDraggableIndicators() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {data} = useIndicators();
  const {convertTimestampToIsoDate} = useDate();

  const parseIndex = (optionString: string | null): number | null => {
    if (optionString === null) {
      return null;
    }

    const stringElements = optionString.split(' ');
    return Number(stringElements[0]);
  };

  const indicatorOptions = computed(() => {
    if (aggregatedIndicators.value === null) {
      return [];
    }

    const options = aggregatedIndicators.value.map(
      (i) => `${i.extractor.index} - ${i.extractor.name}`,
    );

    return convertToNaiveSelectOptions(options);
  });

  const handleExportClick = () => {
    const csv = new Csv();
    csv.addColumn('intervalIndex');
    csv.addColumn('site');
    csv.addColumn('timestamp');
    csv.addColumn('values');

    for (const d of data.value) {
      csv.createRow();
      csv.addToCurrentRow(d.index.toString());
      csv.addToCurrentRow(d.site);
      csv.addToCurrentRow(convertTimestampToIsoDate(d.timestamp));
      csv.addToCurrentRow(d.values.join('; '));
    }

    csv.download('indicators');
  };

  return {
    isCandles: isCandles,
    isSelection: isSelection,
    isCondensed: isCondensed,
    currentIndicator: currentIndicator,
    indicatorOptions: indicatorOptions,
    handleExportClick: handleExportClick,
    parseIndex: parseIndex,
  };
}
