import {
  HOP_MS_DEFAULT,
  INCLUDE_IN_AGGREGATION_DEFAULT,
  NDSI_BAND_ANTHRO,
  NDSI_BAND_BIO,
  WINDOW_MS_DEFAULT,
} from '@shared/constants.ts';
import {type ExtractorDto} from '@shared/dtos.ts';
import {
  type AdiImpl,
  ExtractorImpl,
  type FrequencyScale,
  type StftWindowType,
} from '@shared/enums.ts';
import {useCallback, useMemo} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {useExtractorDefaults} from 'src/panels/extractions/hooks/use-extractor-defaults.ts';

export function useExtractorState(extraction: ExtractionConfig) {
  const {updateExtraction} = useExtractionState();
  const {createExtractorWithDefaults} = useExtractorDefaults();

  const extractors = useMemo(
    () => extraction.extractors,
    [extraction.extractors],
  );

  const addExtractor = useCallback(() => {
    extraction.extractors.push({
      index: extraction.extractors.length,
      name: '',
      impl: ExtractorImpl.enum.VGGISH,
      window: WINDOW_MS_DEFAULT,
      hop: HOP_MS_DEFAULT,
      include_in_aggregation: INCLUDE_IN_AGGREGATION_DEFAULT,
    });

    updateExtraction(extraction);
  }, [extraction, updateExtraction]);

  const deleteExtractor = useCallback(
    (extractor: ExtractorDto) => {
      const newExtractors = extraction.extractors.filter(
        (ex) => ex.index !== extractor.index,
      );
      newExtractors.forEach((ex, index) => {
        ex.index = index;
      });
      extraction.extractors = newExtractors;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateIndex = useCallback(
    (extractor: ExtractorDto, index: number) => {
      const newExtractors = [...extraction.extractors];
      const newIndex = extractor.index + index;

      if (newIndex < 0 || newIndex >= extraction.extractors.length) {
        return;
      }

      const existing = newExtractors.find((ex) => ex.index === newIndex);
      const updated = newExtractors.find((ex) => ex.index === extractor.index);
      if (existing && updated) {
        existing.index = extractor.index;
        updated.index = newIndex;
      }

      extraction.extractors = newExtractors;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateName = useCallback(
    (extractor: ExtractorDto, name: string) => {
      extractor.name = name;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateWindow = useCallback(
    (extractor: ExtractorDto, window: number) => {
      extractor.window = window;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateImpl = useCallback(
    (extractor: ExtractorDto, impl: ExtractorImpl) => {
      const newExtractor: ExtractorDto = {
        index: extractor.index,
        name: extractor.name,
        impl,
        window: WINDOW_MS_DEFAULT,
        hop: HOP_MS_DEFAULT,
        include_in_aggregation: INCLUDE_IN_AGGREGATION_DEFAULT,
      };

      extraction.extractors[extractor.index] =
        createExtractorWithDefaults(newExtractor);
      updateExtraction(extraction);
    },
    [extraction, updateExtraction, createExtractorWithDefaults],
  );

  const updateHop = useCallback(
    (extractor: ExtractorDto, hop: number) => {
      extractor.hop = hop;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateIncludeInAggregation = useCallback(
    (extractor: ExtractorDto, includeInAggregation: boolean) => {
      extractor.include_in_aggregation = includeInAggregation;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  // spectrum/spectrogram

  const updateSpectroNBands = useCallback(
    (extractor: ExtractorDto, n: number) => {
      extractor.spectro_n_bands = n;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateSpectroScale = useCallback(
    (extractor: ExtractorDto, scale: FrequencyScale) => {
      extractor.spectro_scale = scale;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateSpectroStftWindowType = useCallback(
    (extractor: ExtractorDto, window_type: StftWindowType) => {
      extractor.spectro_stft_window_type = window_type;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateSpectroStftWindowMs = useCallback(
    (extractor: ExtractorDto, ms: number) => {
      extractor.spectro_stft_window_ms = ms;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateSpectroStftOverlapRatio = useCallback(
    (extractor: ExtractorDto, ratio: number) => {
      extractor.spectro_stft_overlap_ratio = ratio;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  // mps

  const updateMpsNBands = useCallback(
    (extractor: ExtractorDto, n_bands: number) => {
      extractor.mps_n_bands = n_bands;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateMpsScale = useCallback(
    (extractor: ExtractorDto, scale: FrequencyScale) => {
      extractor.mps_scale = scale;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateMpsStft1WindowMs = useCallback(
    (extractor: ExtractorDto, ms: number) => {
      extractor.mps_stft_1_window_ms = ms;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateMpsStft1OverlapRatio = useCallback(
    (extractor: ExtractorDto, ratio: number) => {
      extractor.mps_stft_1_overlap_ratio = ratio;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateMpsStft2WindowMs = useCallback(
    (extractor: ExtractorDto, ms: number) => {
      extractor.mps_stft_2_window_ms = ms;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateMpsStft2OverlapRatio = useCallback(
    (extractor: ExtractorDto, ratio: number) => {
      extractor.mps_stft_2_overlap_ratio = ratio;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  // mfcc

  const updateMfccNMfcc = useCallback(
    (extractor: ExtractorDto, n: number) => {
      extractor.mfcc_n_mfcc = n;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  // ndsi

  const updateNdsiBioLow = useCallback(
    (extractor: ExtractorDto, low: number) => {
      const newBand = extractor.ndsi_band_bio ?? NDSI_BAND_BIO;
      newBand[0] = low;
      extractor.ndsi_band_bio = newBand;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateNdsiBioHigh = useCallback(
    (extractor: ExtractorDto, high: number) => {
      const newBand = extractor.ndsi_band_bio ?? NDSI_BAND_BIO;
      newBand[1] = high;
      extractor.ndsi_band_bio = newBand;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateNdsiAnthroLow = useCallback(
    (extractor: ExtractorDto, low: number) => {
      const newBand = extractor.ndsi_band_anthro ?? NDSI_BAND_ANTHRO;
      newBand[0] = low;
      extractor.ndsi_band_anthro = newBand;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateNdsiAnthroHigh = useCallback(
    (extractor: ExtractorDto, high: number) => {
      const newBand = extractor.ndsi_band_anthro ?? NDSI_BAND_ANTHRO;
      newBand[1] = high;
      extractor.ndsi_band_anthro = newBand;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  // adi

  const updateAdiBinStep = useCallback(
    (extractor: ExtractorDto, bin_step: number) => {
      extractor.adi_bin_step = bin_step;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateAdiImpl = useCallback(
    (extractor: ExtractorDto, impl: AdiImpl) => {
      extractor.adi_impl = impl;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateAdiDbThreshold = useCallback(
    (extractor: ExtractorDto, threshold: number) => {
      extractor.adi_db_threshold = threshold;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  // ht

  const updateHtFrameSize = useCallback(
    (extractor: ExtractorDto, frameSize: number) => {
      extractor.ht_frame_size = frameSize;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  // med

  const updateMedFrameSize = useCallback(
    (extractor: ExtractorDto, frameSize: number) => {
      extractor.med_frame_size = frameSize;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  // leq percentile

  const updateLeqPercentileDt = useCallback(
    (extractor: ExtractorDto, dt: number) => {
      extractor.leq_percentile_dt = dt;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateLeqPercentileValue = useCallback(
    (extractor: ExtractorDto, value: number) => {
      extractor.leq_percentile_value = value;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  // leq diff

  const updateLeqDiffDt = useCallback(
    (extractor: ExtractorDto, dt: number) => {
      extractor.leq_diff_dt = dt;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateLeqDiffPercentileA = useCallback(
    (extractor: ExtractorDto, percentile: number) => {
      extractor.leq_diff_percentile_a = percentile;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateLeqDiffPercentileB = useCallback(
    (extractor: ExtractorDto, percentile: number) => {
      extractor.leq_diff_percentile_b = percentile;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  return {
    extractors,
    addExtractor,
    deleteExtractor,
    updateIndex,
    updateName,
    updateImpl,
    updateWindow,
    updateHop,
    updateIncludeInAggregation,
    updateSpectroNBands,
    updateSpectroScale,
    updateSpectroStftWindowType,
    updateSpectroStftWindowMs,
    updateSpectroStftOverlapRatio,
    updateMpsNBands,
    updateMpsScale,
    updateMpsStft1WindowMs,
    updateMpsStft1OverlapRatio,
    updateMpsStft2WindowMs,
    updateMpsStft2OverlapRatio,
    updateMfccNMfcc,
    updateNdsiBioLow,
    updateNdsiBioHigh,
    updateNdsiAnthroLow,
    updateNdsiAnthroHigh,
    updateAdiBinStep,
    updateAdiImpl,
    updateAdiDbThreshold,
    updateHtFrameSize,
    updateMedFrameSize,
    updateLeqPercentileDt,
    updateLeqPercentileValue,
    updateLeqDiffDt,
    updateLeqDiffPercentileA,
    updateLeqDiffPercentileB,
  };
}
