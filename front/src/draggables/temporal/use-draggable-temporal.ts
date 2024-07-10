import {Csv} from 'src/common/csv';
import {useDate} from 'src/composables/use-date';
import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useTemporal} from 'src/draggables/temporal/use-temporal';
import {computed, ref} from 'vue';

type Selection = 'Scatter' | 'Sites';

const selections: Selection[] = ['Scatter', 'Sites'];
const selection = ref<Selection>(selections[0]);

const indicator = ref<string>('');
const hasIndicator = computed<boolean>(() => indicator.value !== '');

type Display = 'Continuous' | 'Candles';
const displays: Display[] = ['Continuous', 'Candles'];
const display = ref<Display>(displays[0]);

const isSites = computed<boolean>(() => selection.value === 'Sites');
const isScatter = computed<boolean>(() => selection.value === 'Scatter');
const isContinuous = computed<boolean>(() => display.value === 'Continuous');
const isCandles = computed<boolean>(() => display.value === 'Candles');
const isCondensed = ref<boolean>(true);
const isDisplay = ref<boolean>(true); // whether plot is shown or not

export function useDraggableTemporal() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {data} = useTemporal();
  const {convertTimestampToIsoDate} = useDate();
  const {selectIndicator} = useTemporal();

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

  const toggleDisplay = () => (isDisplay.value = !isDisplay.value);

  return {
    selection: selection,
    selections: selections,
    hasIndicator: hasIndicator,
    indicator: indicator,
    indicators: indicators,
    display: display,
    displays: displays,
    isSites: isSites,
    isScatter: isScatter,
    isContinuous: isContinuous,
    isCandles: isCandles,
    isCondensed: isCondensed,
    isDisplay: isDisplay,
    toggleDisplay: toggleDisplay,
    handleExportClick: handleExportClick,
    update: update,
  };
}
