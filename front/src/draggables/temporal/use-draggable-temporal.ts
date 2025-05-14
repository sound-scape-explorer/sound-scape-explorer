import {Csv} from 'src/common/csv';
import {useDate} from 'src/composables/use-date';
import {useExportName} from 'src/composables/use-export-name';
import {useStorageAggregatedAcousticIndices} from 'src/composables/use-storage-aggregated-acoustic-indices';
import {useTemporal} from 'src/draggables/temporal/use-temporal';
import {computed, ref} from 'vue';
import {z} from 'zod';

const indicator = ref<string>('');
const hasIndicator = computed<boolean>(() => indicator.value !== '');

export const TemporalDisplay = z.enum(['Continuous', 'Candles']);
// eslint-disable-next-line no-redeclare
export type TemporalDisplay = z.infer<typeof TemporalDisplay>;

const display = ref<TemporalDisplay>(TemporalDisplay.enum.Continuous);

const isCandles = computed<boolean>(() => display.value === 'Candles');
const isCondensed = ref<boolean>(true);
const isDisplay = ref<boolean>(true); // whether the plot is shown or not
const isExpanded = ref<boolean>(false);

export function useDraggableTemporal() {
  const {aggregatedIndices} = useStorageAggregatedAcousticIndices();
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
    if (aggregatedIndices.value === null) {
      return [];
    }

    return aggregatedIndices.value.map(
      ({index}) => `${index.index} - ${index.impl}`,
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
    hasIndicator,
    indicator,
    indicators,
    display,
    isCandles,
    isCondensed,
    isDisplay,
    toggleDisplay,
    handleExportClick,
    update,
    isExpanded,
    toggleExpanded,
  };
}
