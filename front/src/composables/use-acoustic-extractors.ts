import {ExtractorDto} from '@shared/dtos';
import {ExtractorType} from '@shared/enums';
import {extractorTypeByImpl} from 'src/common/extractor-type-by-impl';
import {useViewSelection} from 'src/composables/use-view-selection';
import {SLUG_DELIMITER} from 'src/constants';
import {ref} from 'vue';

const acousticExtractors = ref<ExtractorDto[]>([]);
const acousticSlugs = ref<string[]>([]);

export function useAcousticExtractors() {
  const {extraction} = useViewSelection();

  const load = () => {
    if (extraction.value === null) {
      return;
    }

    const filtered = extraction.value.extractors.filter(
      (ex) => extractorTypeByImpl[ex.impl] === ExtractorType.enum.ACOUSTICS,
    );

    acousticExtractors.value = filtered;
    acousticSlugs.value = filtered.map(extractorToSlug);
  };

  const reset = () => {
    acousticExtractors.value = [];
    acousticSlugs.value = [];
  };

  const slugToExtractor = (slug: string): ExtractorDto => {
    const parts = slug.split(SLUG_DELIMITER);
    const index = Number(parts[0]);
    const name = parts[1];

    const ex = acousticExtractors.value.find(
      (e) => e.index === index && e.name === name,
    );

    if (!ex) {
      throw new Error(`Acoustics extractor not found for slug ${slug}`);
    }

    return ex;
  };

  const extractorToSlug = (ex: ExtractorDto) => {
    return `${ex.index} - ${ex.name}`;
  };

  return {
    acousticExtractors,
    acousticSlugs,
    load,
    reset,
    extractorToSlug,
    slugToExtractor,
  };
}
