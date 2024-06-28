import {Csv} from 'src/common/csv';
import {useDate} from 'src/composables/date';
import {useStorageAggregatedIndicators} from 'src/composables/storage-aggregated-indicators';
import {useIndicators} from 'src/draggables/indicators/indicators';
import {computed, ref} from 'vue';

type Selection = 'Sites' | 'Labels';

const selections: Selection[] = ['Sites', 'Labels'];
const selection = ref<Selection>(selections[0]);

const indicator = ref<string>('');

type Display = 'Continuous' | 'Candles';
const displays: Display[] = ['Continuous', 'Candles'];
const display = ref<Display>(displays[0]);

const isSites = computed<boolean>(() => selection.value === 'Sites');
const isLabels = computed<boolean>(() => selection.value === 'Labels');
const isContinuous = computed<boolean>(() => display.value === 'Continuous');
const isCandles = computed<boolean>(() => display.value === 'Candles');
const isCondensed = ref<boolean>(true);

export function useDraggableIndicators() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {data} = useIndicators();
  const {convertTimestampToIsoDate} = useDate();
  const {selectIndicator} = useIndicators();

  const parseIndex = (optionString: string | null): number | null => {
    if (optionString === null) {
      return null;
    }

    const stringElements = optionString.split(' ');
    return Number(stringElements[0]);
  };

  const update = () => {
    selectIndicator(parseIndex(indicator.value));
  };

  const indicators = computed(() => {
    if (aggregatedIndicators.value === null) {
      return [];
    }

    return aggregatedIndicators.value.map(
      (i) => `${i.extractor.index} - ${i.extractor.name}`,
    );
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
    selection: selection,
    selections: selections,
    indicator: indicator,
    indicators: indicators,
    display: display,
    displays: displays,
    isSites: isSites,
    isLabels: isLabels,
    isContinuous: isContinuous,
    isCandles: isCandles,
    isCondensed: isCondensed,
    handleExportClick: handleExportClick,
    update: update,
  };
}
