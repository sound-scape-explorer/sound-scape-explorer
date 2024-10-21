import {type Extractor} from 'src/composables/use-extractors';

export function generateUniqueExtractorSlug(extractor: Extractor): string {
  return `${extractor.index} - ${extractor.name}`;
}
