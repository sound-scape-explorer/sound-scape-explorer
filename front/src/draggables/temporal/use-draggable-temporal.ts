import {type ExtractorDto} from '@shared/dtos';
import {useAcousticDataReader} from 'src/composables/use-acoustic-data-reader';
import {useAcousticExtractors} from 'src/composables/use-acoustic-extractors';
import {useAcousticSerializer} from 'src/composables/use-acoustic-serializer';
import {useTemporalSeries} from 'src/draggables/temporal/use-temporal-series';
import {computed, ref} from 'vue';
import {z} from 'zod';

const extractorSlug = ref<string>('');
const extractor = ref<ExtractorDto | null>(null);
const hasExtractor = computed<boolean>(() => extractorSlug.value !== '');

export const TemporalDisplay = z.enum(['Continuous', 'Candles']);
// eslint-disable-next-line no-redeclare
export type TemporalDisplay = z.infer<typeof TemporalDisplay>;

const display = ref<TemporalDisplay>(TemporalDisplay.enum.Continuous);

const isCandles = computed<boolean>(
  () => display.value === TemporalDisplay.enum.Candles,
);
const isCondensed = ref<boolean>(true);
const isDisplay = ref<boolean>(true); // whether the plot is shown or not
const isExpanded = ref<boolean>(false);

export function useDraggableTemporal() {
  const {slugToExtractor} = useAcousticExtractors();
  const {read} = useAcousticDataReader();
  const {serialize} = useAcousticSerializer();
  const {set} = useTemporalSeries();

  const handleExtractorChange = async () => {
    extractor.value = slugToExtractor(extractorSlug.value);
    const data = await read(extractor.value);
    const series = await serialize(data);
    set(series);
  };

  const toggleDisplay = () => (isDisplay.value = !isDisplay.value);
  const toggleExpanded = () => (isExpanded.value = !isExpanded.value);

  return {
    extractor,
    extractorSlug,
    hasExtractor,
    display,
    isCandles,
    isCondensed,
    isDisplay,
    toggleDisplay,
    handleExtractorChange,
    isExpanded,
    toggleExpanded,
  };
}
