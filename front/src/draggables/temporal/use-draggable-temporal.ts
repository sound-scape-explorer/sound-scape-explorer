import {type ExtractorDto} from '@shared/dtos';
import {Csv} from 'src/common/csv';
import {useAcoustics} from 'src/composables/use-acoustics';
import {useAcousticsExtractors} from 'src/composables/use-acoustics-extractors';
import {useDate} from 'src/composables/use-date';
import {useExportName} from 'src/composables/use-export-name';
import {ExportType, SLUG_DELIMITER} from 'src/constants';
import {useTemporalData} from 'src/draggables/temporal/use-temporal-data';
import {useTemporalStrategy} from 'src/draggables/temporal/use-temporal-strategy';
import {getSortedIndices} from 'src/utils/utils';
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
  const {acousticsExtractors} = useAcousticsExtractors();
  const {read} = useAcoustics();
  const {data, update} = useTemporalData();
  const {convertTimestampToIsoDate} = useDate();
  const {generate} = useExportName();
  const {apply} = useTemporalStrategy();

  const slugToExtractor = (slug: string): ExtractorDto => {
    const parts = slug.split(SLUG_DELIMITER);
    const index = Number(parts[0]);
    const name = parts[1];

    const ex = acousticsExtractors.value.find(
      (e) => e.index === index && e.name === name,
    );

    if (!ex) {
      throw new Error(`Acoustics extractor not found for slug ${slug}`);
    }

    return ex;
  };

  const handleExtractorChange = () => {
    extractor.value = slugToExtractor(extractorSlug.value);
    read(extractor.value).then(update);
  };

  const extractorToSlug = (ex: ExtractorDto) => {
    return `${ex.index} - ${ex.name}`;
  };

  const extractorSlugs = computed(() => {
    if (acousticsExtractors.value === null) {
      return [];
    }

    return acousticsExtractors.value.map((ex) => extractorToSlug(ex));
  });

  const handleExportClick = () => {
    const csv = new Csv();
    csv.addColumn('intervalIndex');
    csv.addColumn('site');
    csv.addColumn('timestamp');
    csv.addColumn('scalar');

    const indices = getSortedIndices(data.value.map((d) => d.timestamp));

    for (let i = 0; i < data.value.length; i += 1) {
      const d = data.value[i];
      csv.createRow();
      csv.addToCurrentRow(indices[d.index].toString());
      csv.addToCurrentRow(d.siteName);
      csv.addToCurrentRow(convertTimestampToIsoDate(d.timestamp));
      csv.addToCurrentRow(apply(d.values).toString());
    }

    const name = generate(ExportType.enum.temporal);
    csv.download(name);
  };

  const toggleDisplay = () => (isDisplay.value = !isDisplay.value);
  const toggleExpanded = () => (isExpanded.value = !isExpanded.value);

  return {
    extractor,
    extractorSlug,
    extractorSlugs,
    hasExtractor,
    display,
    isCandles,
    isCondensed,
    isDisplay,
    toggleDisplay,
    handleExportClick,
    handleExtractorChange,
    isExpanded,
    toggleExpanded,
  };
}
