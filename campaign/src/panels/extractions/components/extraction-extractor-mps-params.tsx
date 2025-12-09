import {SectionCard} from '@blueprintjs/core';
import {
  MPS_N_BANDS,
  MPS_SCALE,
  MPS_STFT_1_OVERLAP_RATIO,
  MPS_STFT_1_WINDOW_MS,
  MPS_STFT_2_OVERLAP_RATIO,
  MPS_STFT_2_WINDOW_MS,
} from '@shared/constants';
import {type ExtractorDto} from '@shared/dtos';
import {FrequencyScale} from '@shared/enums';
import clsx from 'clsx';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useExtractorState} from 'src/panels/extractions/hooks/use-extractor-state.ts';
import {useExtractorValidation} from 'src/panels/extractions/hooks/use-extractor-validation.ts';
import {NumberInput} from 'src/primitives/number-input.tsx';
import {Select} from 'src/primitives/select.tsx';

import styles from './config-extractors.module.scss';

interface Props {
  extraction: ExtractionConfig;
  extractor: ExtractorDto;
}

export function ExtractionExtractorMpsParams({extraction, extractor}: Props) {
  const {
    updateMpsNBands,
    updateMpsScale,
    updateMpsStft1WindowMs,
    updateMpsStft1OverlapRatio,
    updateMpsStft2WindowMs,
    updateMpsStft2OverlapRatio,
  } = useExtractorState(extraction);

  const {
    isMpsNBandsValid,
    isMpsStft1WindowMsValid,
    isMpsStft1OverlapRatioValid,
    isMpsStft2WindowMsValid,
    isMpsStft2OverlapRatioValid,
  } = useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsMps,
        )}
      >
        <code className="bp5-text-small">n_bands</code>
        <code className="bp5-text-small">scale</code>
        <code className="bp5-text-small">STFT 1 window len (ms)</code>
        <code className="bp5-text-small">STFT 1 overlap ratio</code>
        <code className="bp5-text-small">STFT 2 window len (ms)</code>
        <code className="bp5-text-small">STFT 2 overlap ratio</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsMps,
        )}
      >
        <NumberInput
          defaultValue={extractor.mps_n_bands ?? MPS_N_BANDS}
          onBlur={(v) => updateMpsNBands(extractor, v)}
          intent={isMpsNBandsValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <Select
          items={FrequencyScale.options}
          current={extractor.mps_scale ?? MPS_SCALE}
          onSelect={(v) => updateMpsScale(extractor, v)}
          size="small"
        />

        <NumberInput
          defaultValue={extractor.mps_stft_1_window_ms ?? MPS_STFT_1_WINDOW_MS}
          onBlur={(v) => updateMpsStft1WindowMs(extractor, v)}
          intent={isMpsStft1WindowMsValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={
            extractor.mps_stft_1_overlap_ratio ?? MPS_STFT_1_OVERLAP_RATIO
          }
          onBlur={(v) => updateMpsStft1OverlapRatio(extractor, v)}
          intent={isMpsStft1OverlapRatioValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={extractor.mps_stft_2_window_ms ?? MPS_STFT_2_WINDOW_MS}
          onBlur={(v) => updateMpsStft2WindowMs(extractor, v)}
          intent={isMpsStft2WindowMsValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={
            extractor.mps_stft_2_overlap_ratio ?? MPS_STFT_2_OVERLAP_RATIO
          }
          onBlur={(v) => updateMpsStft2OverlapRatio(extractor, v)}
          intent={isMpsStft2OverlapRatioValid(extractor) ? 'success' : 'danger'}
          size="small"
        />
      </SectionCard>
    </>
  );
}
