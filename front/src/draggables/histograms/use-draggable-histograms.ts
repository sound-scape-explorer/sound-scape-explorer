import {type ExtractorDto} from '@shared/dtos';
import {useAcousticsExtractors} from 'src/composables/use-acoustics-extractors';
import {SLUG_DELIMITER} from 'src/constants';
import {ref} from 'vue';
import {z} from 'zod';

const divRef = ref<HTMLDivElement | null>(null);
const name = ref<string | null>(null);

export const HistogramOver = z.enum(['Hours']);
// eslint-disable-next-line no-redeclare
export type HistogramOver = z.infer<typeof HistogramOver>;

export const HistogramFunction = z.enum(['count', 'sum', 'avg', 'min', 'max']);
// eslint-disable-next-line no-redeclare
export type HistogramFunction = z.infer<typeof HistogramFunction>;

const fn = ref<HistogramFunction>(HistogramFunction.enum.avg);
const over = ref<HistogramOver>(HistogramOver.enum.Hours);

const acousticsExtractor = ref<ExtractorDto | null>(null);
const acousticsExtractorSlug = ref<string | null>(null);

// TODO: to remove
export function useDraggableHistograms() {
  const {acousticsExtractors} = useAcousticsExtractors();

  const extractorToSlug = (ex: ExtractorDto) => {
    return `${ex.index} - ${ex.name}`;
  };

  const slugToExtractor = (slug: string) => {
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

  return {
    divRef,
    name,
    over,
    fn,
    acousticsExtractors,
    acousticsExtractor,
    acousticsExtractorSlug,
    extractorToSlug,
    slugToExtractor,
  };
}
