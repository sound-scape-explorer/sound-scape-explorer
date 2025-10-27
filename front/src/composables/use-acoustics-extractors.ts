import {ExtractorDto} from '@shared/dtos';
import {ExtractorType} from '@shared/enums';
import {extractorTypeByImpl} from 'src/common/extractor-type-by-impl';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

const acousticsExtractors = ref<ExtractorDto[]>([]);

export function useAcousticsExtractors() {
  const {extraction} = useViewSelection();

  const load = () => {
    if (extraction.value === null) {
      return;
    }

    const filtered = extraction.value.extractors.filter(
      (ex) => extractorTypeByImpl[ex.impl] === ExtractorType.enum.ACOUSTICS,
    );

    acousticsExtractors.value = filtered;
  };

  const reset = () => {
    acousticsExtractors.value = [];
  };

  return {
    acousticsExtractors,
    load,
    reset,
  };
}
