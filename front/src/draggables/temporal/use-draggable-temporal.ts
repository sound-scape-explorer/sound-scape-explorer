import {Csv} from 'src/common/csv';
import {useDate} from 'src/composables/use-date';
import {useExportName} from 'src/composables/use-export-name';
import {useStorageAggregatedIndicators} from 'src/composables/use-storage-aggregated-indicators';
import {useTemporal} from 'src/draggables/temporal/use-temporal';
import {computed, ref} from 'vue';

const indicator = ref<string>('');
const hasIndicator = computed<boolean>(() => indicator.value !== '');

type Display = 'Continuous' | 'Candles';
const displays: Display[] = ['Continuous', 'Candles'];
const display = ref<Display>(displays[0]);

const isCandles = computed<boolean>(() => display.value === 'Candles');
const isCondensed = ref<boolean>(true);
const isDisplay = ref<boolean>(true); // whether plot is shown or not
const isExpanded = ref<boolean>(false);

export function useDraggableTemporal() {
  const {aggregatedIndicators} = useStorageAggregatedIndicators();
  const {data} = useTemporal();
  const {convertTimestampToIsoDate} = useDate();
  const {selectIndicator} = useTemporal();
  const {generate} = useExportName();

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

    const name = generate('indicators');
    csv.download(name);
  };

  const toggleDisplay = () => (isDisplay.value = !isDisplay.value);
  const toggleExpanded = () => (isExpanded.value = !isExpanded.value);

  return {
    hasIndicator: hasIndicator,
    indicator: indicator,
    indicators: indicators,
    display: display,
    displays: displays,
    isCandles: isCandles,
    isCondensed: isCondensed,
    isDisplay: isDisplay,
    toggleDisplay: toggleDisplay,
    handleExportClick: handleExportClick,
    update: update,
    isExpanded: isExpanded,
    toggleExpanded: toggleExpanded,
  };
}
