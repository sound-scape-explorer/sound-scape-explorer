import {type ExtractionDto, type ExtractorDto} from '@shared/dtos';
import {useCallback} from 'react';
import {createDefaultValidation, isInt} from 'src/utils/validation';

export function useExtractorValidation() {
  const isNameValid = useCallback(
    (extractor: ExtractorDto, extraction: ExtractionDto) => {
      if (extractor.name === '') {
        return false;
      }

      const names = extraction.extractors
        .filter((ex) => ex.index !== extractor.index)
        .map((ex) => ex.name);

      // noinspection RedundantIfStatementJS
      if (names.includes(extractor.name)) {
        return false;
      }

      return true;
    },
    [],
  );

  const isWindowValid = useCallback((extractor: ExtractorDto) => {
    if (!isInt(extractor.window)) {
      return false;
    }

    return extractor.window > 0;
  }, []);

  const isHopValid = useCallback((extractor: ExtractorDto) => {
    if (!isInt(extractor.hop)) {
      return false;
    }

    return extractor.hop > 0;
  }, []);

  // spectrum/spectrogram

  const isSpectroNBandsValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.spectro_n_bands === 'undefined') {
      return true;
    }

    return isInt(extractor.spectro_n_bands) && extractor.spectro_n_bands > 0;
  }, []);

  const isSpectroStftWindowMsValid = useCallback((extractor: ExtractorDto) => {
    if (
      typeof extractor.spectro_stft_window_ms === 'undefined' ||
      extractor.spectro_stft_window_ms === null
    ) {
      return true;
    }

    return (
      isInt(extractor.spectro_stft_window_ms) &&
      extractor.spectro_stft_window_ms > 0
    );
  }, []);

  const isSpectroStftOverlapRatioValid = useCallback(
    (extractor: ExtractorDto) => {
      if (typeof extractor.spectro_stft_overlap_ratio === 'undefined') {
        return true;
      }

      return (
        extractor.spectro_stft_overlap_ratio >= 0.0 &&
        extractor.spectro_stft_overlap_ratio <= 1.0
      );
    },
    [],
  );

  // mps

  const isMpsNBandsValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.mps_n_bands === 'undefined') {
      return true;
    }

    return isInt(extractor.mps_n_bands) && extractor.mps_n_bands > 0;
  }, []);

  const isMpsStft1WindowMsValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.mps_stft_1_window_ms === 'undefined') {
      return true;
    }

    return (
      isInt(extractor.mps_stft_1_window_ms) &&
      extractor.mps_stft_1_window_ms > 0
    );
  }, []);

  const isMpsStft1OverlapRatioValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.mps_stft_1_overlap_ratio === 'undefined') {
      return true;
    }

    return (
      extractor.mps_stft_1_overlap_ratio >= 0.0 &&
      extractor.mps_stft_1_overlap_ratio <= 1.0
    );
  }, []);

  const isMpsStft2WindowMsValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.mps_stft_2_window_ms === 'undefined') {
      return true;
    }

    return (
      isInt(extractor.mps_stft_2_window_ms) &&
      extractor.mps_stft_2_window_ms > 0
    );
  }, []);

  const isMpsStft2OverlapRatioValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.mps_stft_2_overlap_ratio === 'undefined') {
      return true;
    }

    return (
      extractor.mps_stft_2_overlap_ratio >= 0.0 &&
      extractor.mps_stft_2_overlap_ratio <= 1.0
    );
  }, []);

  // mfcc

  const isMfccNMfccValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.mfcc_n_mfcc === 'undefined') {
      return true;
    }

    return isInt(extractor.mfcc_n_mfcc) && extractor.mfcc_n_mfcc > 0;
  }, []);

  // ndsi

  const isNdsiBioLowValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.ndsi_band_bio === 'undefined') {
      return true;
    }

    const low = extractor.ndsi_band_bio[0];
    const high = extractor.ndsi_band_bio[1];

    return isInt(low) && low >= 0 && low < high;
  }, []);

  const isNdsiBioHighValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.ndsi_band_bio === 'undefined') {
      return true;
    }

    const low = extractor.ndsi_band_bio[0];
    const high = extractor.ndsi_band_bio[1];

    return isInt(high) && high >= 0 && high > low;
  }, []);

  const isNdsiAnthroLowValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.ndsi_band_anthro === 'undefined') {
      return true;
    }

    const low = extractor.ndsi_band_anthro[0];
    const high = extractor.ndsi_band_anthro[1];

    return isInt(low) && low >= 0 && low < high;
  }, []);

  const isNdsiAnthroHighValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.ndsi_band_anthro === 'undefined') {
      return true;
    }

    const low = extractor.ndsi_band_anthro[0];
    const high = extractor.ndsi_band_anthro[1];

    return isInt(high) && high >= 0 && high > low;
  }, []);

  // adi

  const isAdiBinStepValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.adi_bin_step === 'undefined') {
      return true;
    }

    return isInt(extractor.adi_bin_step) && extractor.adi_bin_step > 0;
  }, []);

  const isAdiDbThresholdValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.adi_db_threshold === 'undefined') {
      return true;
    }

    return isInt(extractor.adi_db_threshold) && extractor.adi_db_threshold < 0;
  }, []);

  // ht

  const isHtFrameSizeValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.ht_frame_size === 'undefined') {
      return true;
    }

    return isInt(extractor.ht_frame_size) && extractor.ht_frame_size > 0;
  }, []);

  // med

  const isMedFrameSizeValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.med_frame_size === 'undefined') {
      return true;
    }

    return isInt(extractor.med_frame_size) && extractor.med_frame_size > 0;
  }, []);

  // leq percentile

  const isLeqPercentileDtValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.leq_percentile_dt === 'undefined') {
      return true;
    }

    return extractor.leq_percentile_dt > 0;
  }, []);

  const isLeqPercentileValueValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.leq_percentile_value === 'undefined') {
      return true;
    }

    return (
      isInt(extractor.leq_percentile_value) &&
      extractor.leq_percentile_value > 0
    );
  }, []);

  // leq diff

  const isLeqDiffDtValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.leq_diff_dt === 'undefined') {
      return true;
    }

    return extractor.leq_diff_dt > 0;
  }, []);

  const isLeqDiffPercentileAValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.leq_diff_percentile_a === 'undefined') {
      return true;
    }

    return (
      isInt(extractor.leq_diff_percentile_a) &&
      extractor.leq_diff_percentile_a > 0
    );
  }, []);

  const isLeqDiffPercentileBValid = useCallback((extractor: ExtractorDto) => {
    if (typeof extractor.leq_diff_percentile_b === 'undefined') {
      return true;
    }

    return (
      isInt(extractor.leq_diff_percentile_b) &&
      extractor.leq_diff_percentile_b > 0
    );
  }, []);

  const validate = useCallback(
    (extraction: ExtractionDto) => {
      const v = createDefaultValidation();
      const l = extraction.extractors.length;
      v.intent = l > 0 ? 'success' : 'primary';
      v.content = `${l} ${l > 1 ? 'extractors' : 'extractor'}`;

      if (l === 0) {
        v.intent = 'danger';
        v.content = 'empty';
        return v;
      }

      for (const extractor of extraction.extractors) {
        if (!isNameValid(extractor, extraction)) {
          v.intent = 'warning';
          v.content = 'invalid names';
          break;
        }

        if (!isWindowValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid windows';
          break;
        }

        if (!isHopValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid hops';
          break;
        }

        // spectrum/spectrogram

        if (!isSpectroNBandsValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid spectro_n_bands';
          break;
        }

        if (!isSpectroStftWindowMsValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid spectro_stft_window_ms';
          break;
        }

        if (!isSpectroStftOverlapRatioValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid spectro_stft_overlap_ratio';
          break;
        }

        // mps

        if (!isMpsNBandsValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid mps_n_bands';
          break;
        }

        if (!isMpsStft1WindowMsValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid mps_stft_1_window_ms';
          break;
        }

        if (!isMpsStft1OverlapRatioValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid mps_stft_1_overlap_ratio';
          break;
        }

        if (!isMpsStft2WindowMsValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid mps_stft_2_window_ms';
          break;
        }

        if (!isMpsStft2OverlapRatioValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid mps_stft_2_overlap_ratio';
          break;
        }

        // mfcc

        if (!isMfccNMfccValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid mfcc_n_mfcc';
          break;
        }

        // ndsi

        if (!isNdsiBioLowValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid ndsi_bio_low';
          break;
        }

        if (!isNdsiBioHighValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid ndsi_bio_high';
          break;
        }

        if (!isNdsiAnthroLowValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid ndsi_anthro_low';
          break;
        }

        if (!isNdsiAnthroHighValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid ndsi_anthro_high';
          break;
        }

        // adi

        if (!isAdiBinStepValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid adi_bin_step';
          break;
        }

        if (!isAdiDbThresholdValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid adi_db_threshold';
          break;
        }

        // ht

        if (!isHtFrameSizeValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid ht_frame_size';
          break;
        }

        // med

        if (!isMedFrameSizeValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid med_frame_size';
          break;
        }

        // leq percentile

        if (!isLeqPercentileDtValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid leq_percentile_dt';
          break;
        }

        if (!isLeqPercentileValueValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid leq_percentile_value';
          break;
        }

        // leq diff

        if (!isLeqDiffDtValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid leq_diff_dt';
          break;
        }

        if (!isLeqDiffPercentileAValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid leq_diff_percentile_a';
          break;
        }

        if (!isLeqDiffPercentileBValid(extractor)) {
          v.intent = 'warning';
          v.content = 'invalid leq_diff_percentile_b';
          break;
        }
      }

      return v;
    },
    [
      isNameValid,
      isWindowValid,
      isHopValid,
      isSpectroNBandsValid,
      isSpectroStftWindowMsValid,
      isSpectroStftOverlapRatioValid,
      isMpsNBandsValid,
      isMpsStft1WindowMsValid,
      isMpsStft1OverlapRatioValid,
      isMpsStft2WindowMsValid,
      isMpsStft2OverlapRatioValid,
      isMfccNMfccValid,
      isNdsiBioLowValid,
      isNdsiBioHighValid,
      isNdsiAnthroLowValid,
      isNdsiAnthroHighValid,
      isAdiBinStepValid,
      isAdiDbThresholdValid,
      isHtFrameSizeValid,
      isMedFrameSizeValid,
      isLeqPercentileDtValid,
      isLeqPercentileValueValid,
      isLeqDiffDtValid,
      isLeqDiffPercentileAValid,
      isLeqDiffPercentileBValid,
    ],
  );

  return {
    validate,
    isNameValid,
    isWindowValid,
    isHopValid,
    isSpectroNBandsValid,
    isSpectroStftWindowMsValid,
    isSpectroStftOverlapRatioValid,
    isMpsNBandsValid,
    isMpsStft1WindowMsValid,
    isMpsStft1OverlapRatioValid,
    isMpsStft2WindowMsValid,
    isMpsStft2OverlapRatioValid,
    isMfccNMfccValid,
    isNdsiBioLowValid,
    isNdsiBioHighValid,
    isNdsiAnthroLowValid,
    isNdsiAnthroHighValid,
    isAdiBinStepValid,
    isAdiDbThresholdValid,
    isHtFrameSizeValid,
    isMedFrameSizeValid,
    isLeqPercentileDtValid,
    isLeqPercentileValueValid,
    isLeqDiffDtValid,
    isLeqDiffPercentileAValid,
    isLeqDiffPercentileBValid,
  };
}
