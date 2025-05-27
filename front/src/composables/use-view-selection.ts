import {
  type BandDto,
  type ExtractionDto,
  type IntegrationDto,
  type ReducerDto,
} from '@shared/dtos';
import {useConfig} from 'src/composables/use-config';
import {ref} from 'vue';

const extractionSlug = ref<string | null>(null);
const extraction = ref<ExtractionDto | null>(null);

const bandSlug = ref<string | null>(null);
const band = ref<BandDto | null>(null);

const integrationSlug = ref<string | null>(null);
const integration = ref<IntegrationDto | null>(null);

const reducerSlug = ref<string | null>(null);
const reducer = ref<ReducerDto | null>(null);

export function useViewSelection() {
  const {config} = useConfig();
  const extractions = config.value?.extractions ?? [];

  const extractionToSlug = (extraction: ExtractionDto) =>
    `${extraction.index} - ${extraction.name}`;

  const bandToSlug = (band: BandDto) =>
    `${band.index} - ${band.name} - ${band.low}Hz - ${band.high}Hz`;
  const integrationToSlug = (i: IntegrationDto) =>
    `${i.index} - ${i.name} - ${i.duration / 1000}s`;
  const reducerToSlug = (r: ReducerDto) =>
    `${r.index} - ${r.impl} - ${r.dimensions}d`;

  const slugToExtraction = (slug: string) => {
    const parts = slug.split(' - ');
    const index = Number(parts[0]);
    const name = parts[1];

    const extraction = extractions.find(
      (e) => e.index === index && e.name === name,
    );

    if (!extraction) {
      throw new Error(`Extraction not found for slug ${slug}`);
    }

    return extraction;
  };

  const slugToBand = (slug: string) => {
    const parts = slug.split(' - ');
    const index = Number(parts[0]);

    const band = extraction.value?.bands.find((b) => b.index === index);

    if (!band) {
      throw new Error(`Band not found for slug ${slug}`);
    }

    return band;
  };

  const slugToIntegration = (slug: string) => {
    const parts = slug.split(' - ');
    const index = Number(parts[0]);

    const integration = extraction.value?.integrations.find(
      (i) => i.index === index,
    );

    if (!integration) {
      throw new Error(`Integration not found for slug ${slug}`);
    }

    return integration;
  };

  const slugToReducer = (slug: string) => {
    const parts = slug.split(' - ');
    const index = Number(parts[0]);

    const reducer = extraction.value?.reducers.find((r) => r.index === index);

    if (!reducer) {
      throw new Error(`Reducer not found for slug ${slug}`);
    }

    return reducer;
  };

  const reset = () => {
    extractionSlug.value = null;
    bandSlug.value = null;
    integrationSlug.value = null;
    reducerSlug.value = null;

    extraction.value = null;
    band.value = null;
    integration.value = null;
    reducer.value = null;
  };

  return {
    // extractions
    extractions,
    extraction,
    extractionSlug,
    slugToExtraction,
    extractionToSlug,
    // bands
    band,
    bandSlug,
    bandToSlug,
    slugToBand,
    // integrations
    integration,
    integrationSlug,
    integrationToSlug,
    slugToIntegration,
    // reducers
    reducer,
    reducerSlug,
    reducerToSlug,
    slugToReducer,
    // handlers
    reset,
  };
}
