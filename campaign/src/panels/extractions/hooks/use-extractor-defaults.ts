import {
  ADI_BIN_STEP,
  ADI_DB_THRESHOLD,
  ADI_IMPL,
  BIRDNET_WINDOW_MS,
  HOP_MS_DEFAULT,
  HT_FRAME_SIZE,
  LEQ_DIFF_PERCENTILE_A,
  LEQ_DIFF_PERCENTILE_B,
  LEQ_PERCENTILE_VALUE,
  LEQ_SHORT_DT,
  MED_FRAME_SIZE,
  MFCC_N_MFCC,
  MPS_N_BANDS,
  MPS_SCALE,
  MPS_STFT_1_OVERLAP_RATIO,
  MPS_STFT_1_WINDOW_MS,
  MPS_STFT_2_OVERLAP_RATIO,
  MPS_STFT_2_WINDOW_MS,
  MUSICCLASS_WINDOW_MS,
  NDSI_BAND_ANTHRO,
  NDSI_BAND_BIO,
  PERCH_WINDOW_MS,
  SPECTRO_N_BANDS,
  SPECTRO_SCALE,
  SPECTRO_STFT_OVERLAP_RATIO,
  SPECTRO_STFT_WINDOW_MS,
  SPECTRO_STFT_WINDOW_TYPE,
  SURFPERCH_WINDOW_MS,
  VGGISH_WINDOW_MS,
  WINDOW_MS_DEFAULT,
  YAMNET_WINDOW_MS,
} from '@shared/constants.ts';
import {type ExtractorDto} from '@shared/dtos.ts';
import {ExtractorImplEnum} from '@shared/enums.ts';
import {useCallback} from 'react';

export function useExtractorDefaults() {
  const createExtractorWithDefaults = useCallback((ex: ExtractorDto) => {
    const newEx: ExtractorDto = {
      index: ex.index,
      name: ex.name,
      impl: ex.impl,
      window: ex.window ?? WINDOW_MS_DEFAULT,
      hop: ex.hop ?? HOP_MS_DEFAULT,
    };

    switch (ex.impl) {
      case ExtractorImplEnum.enum.BIRDNET: {
        newEx.window = BIRDNET_WINDOW_MS;
        newEx.hop = BIRDNET_WINDOW_MS;
        break;
      }
      case ExtractorImplEnum.enum.PERCH: {
        newEx.window = PERCH_WINDOW_MS;
        newEx.hop = PERCH_WINDOW_MS;
        break;
      }
      case ExtractorImplEnum.enum.SURF_PERCH: {
        newEx.window = SURFPERCH_WINDOW_MS;
        newEx.hop = SURFPERCH_WINDOW_MS;
        break;
      }
      case ExtractorImplEnum.enum.VGGISH: {
        newEx.window = VGGISH_WINDOW_MS;
        newEx.hop = VGGISH_WINDOW_MS;
        break;
      }
      case ExtractorImplEnum.enum.YAMNET: {
        newEx.window = YAMNET_WINDOW_MS;
        newEx.hop = YAMNET_WINDOW_MS;
        break;
      }
      case ExtractorImplEnum.enum.MUSIC_CLASS: {
        newEx.window = MUSICCLASS_WINDOW_MS;
        newEx.hop = MUSICCLASS_WINDOW_MS;
        break;
      }
      case ExtractorImplEnum.enum.SPECTRUM: {
        newEx.spectro_n_bands = ex.spectro_n_bands ?? SPECTRO_N_BANDS;
        newEx.spectro_scale = ex.spectro_scale ?? SPECTRO_SCALE;
        newEx.spectro_stft_window_type =
          ex.spectro_stft_window_type ?? SPECTRO_STFT_WINDOW_TYPE;
        break;
      }
      case ExtractorImplEnum.enum.SPECTROGRAM: {
        newEx.spectro_n_bands = ex.spectro_n_bands ?? SPECTRO_N_BANDS;
        newEx.spectro_scale = ex.spectro_scale ?? SPECTRO_SCALE;
        newEx.spectro_stft_window_type =
          ex.spectro_stft_window_type ?? SPECTRO_STFT_WINDOW_TYPE;
        newEx.spectro_stft_window_ms =
          ex.spectro_stft_window_ms ?? SPECTRO_STFT_WINDOW_MS;
        newEx.spectro_stft_overlap_ratio =
          ex.spectro_stft_overlap_ratio ?? SPECTRO_STFT_OVERLAP_RATIO;
        break;
      }
      case ExtractorImplEnum.enum.MPS: {
        newEx.mps_n_bands = ex.mps_n_bands ?? MPS_N_BANDS;
        newEx.mps_scale = ex.mps_scale ?? MPS_SCALE;
        newEx.mps_stft_1_window_ms =
          ex.mps_stft_1_window_ms ?? MPS_STFT_1_WINDOW_MS;
        newEx.mps_stft_1_overlap_ratio =
          ex.mps_stft_1_overlap_ratio ?? MPS_STFT_1_OVERLAP_RATIO;
        newEx.mps_stft_2_window_ms =
          ex.mps_stft_2_window_ms ?? MPS_STFT_2_WINDOW_MS;
        newEx.mps_stft_2_overlap_ratio =
          ex.mps_stft_2_overlap_ratio ?? MPS_STFT_2_OVERLAP_RATIO;
        break;
      }
      case ExtractorImplEnum.enum.MFCC: {
        newEx.mfcc_n_mfcc = ex.mfcc_n_mfcc ?? MFCC_N_MFCC;
        break;
      }
      case ExtractorImplEnum.enum.NDSI: {
        newEx.ndsi_band_bio = ex.ndsi_band_bio ?? NDSI_BAND_BIO;
        newEx.ndsi_band_anthro = ex.ndsi_band_anthro ?? NDSI_BAND_ANTHRO;
        break;
      }
      case ExtractorImplEnum.enum.ADI: {
        newEx.adi_bin_step = ex.adi_bin_step ?? ADI_BIN_STEP;
        newEx.adi_impl = ex.adi_impl ?? ADI_IMPL;
        newEx.adi_db_threshold = ex.adi_db_threshold ?? ADI_DB_THRESHOLD;
        break;
      }
      case ExtractorImplEnum.enum.HT: {
        newEx.ht_frame_size = ex.ht_frame_size ?? HT_FRAME_SIZE;
        break;
      }
      case ExtractorImplEnum.enum.MED: {
        newEx.med_frame_size = ex.med_frame_size ?? MED_FRAME_SIZE;
        break;
      }
      case ExtractorImplEnum.enum.LEQ_PERCENTILE: {
        newEx.leq_percentile_dt = ex.leq_percentile_dt ?? LEQ_SHORT_DT;
        newEx.leq_percentile_value =
          ex.leq_percentile_value ?? LEQ_PERCENTILE_VALUE;
        break;
      }
      case ExtractorImplEnum.enum.LEQ_DIFF: {
        newEx.leq_diff_dt = ex.leq_diff_dt ?? LEQ_SHORT_DT;
        newEx.leq_diff_percentile_a =
          ex.leq_diff_percentile_a ?? LEQ_DIFF_PERCENTILE_A;
        newEx.leq_diff_percentile_b =
          ex.leq_diff_percentile_b ?? LEQ_DIFF_PERCENTILE_B;
        break;
      }
      default: {
        newEx.window = ex.window ?? WINDOW_MS_DEFAULT;
        newEx.hop = ex.hop ?? WINDOW_MS_DEFAULT;
      }
    }

    return newEx;
  }, []);

  return {
    createExtractorWithDefaults,
  };
}
