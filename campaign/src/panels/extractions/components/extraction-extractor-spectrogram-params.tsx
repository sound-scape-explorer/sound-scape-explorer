import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {
  SPECTRO_N_BANDS,
  SPECTRO_SCALE,
  SPECTRO_STFT_OVERLAP_RATIO,
  SPECTRO_STFT_WINDOW_MS,
  SPECTRO_STFT_WINDOW_TYPE,
} from '@shared/constants';
import {type ExtractorDto} from '@shared/dtos';
import {FrequencyScale, StftWindowType} from '@shared/enums';
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

export function ExtractionExtractorSpectrogramParams({
  extraction,
  extractor,
}: Props) {
  const {
    updateSpectroNBands,
    updateSpectroScale,
    updateSpectroStftWindowType,
    updateSpectroStftWindowMs,
    updateSpectroStftOverlapRatio,
  } = useExtractorState(extraction);

  const {
    isSpectroNBandsValid,
    isSpectroStftWindowMsValid,
    isSpectroStftOverlapRatioValid,
  } = useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsSpectrogram,
        )}
      >
        <code className="bp5-text-small">n_bands</code>
        <code className="bp5-text-small">scale</code>
        <code className="bp5-text-small">STFT window</code>
        <code className="bp5-text-small">STFT window length (ms)</code>
        <code className="bp5-text-small">STFT overlap ratio (0 to 1)</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsSpectrogram,
        )}
      >
        <NumberInput
          defaultValue={extractor.spectro_n_bands ?? SPECTRO_N_BANDS}
          onBlur={(v) => updateSpectroNBands(extractor, v)}
          intent={isSpectroNBandsValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <Select
          items={FrequencyScale.options}
          current={extractor.spectro_scale ?? SPECTRO_SCALE}
          onSelect={(v) => updateSpectroScale(extractor, v)}
          size="small"
        />

        <Select
          items={StftWindowType.options}
          current={
            extractor.spectro_stft_window_type ?? SPECTRO_STFT_WINDOW_TYPE
          }
          onSelect={(v) => updateSpectroStftWindowType(extractor, v)}
          size="small"
        />

        <NumberInput
          defaultValue={
            extractor.spectro_stft_window_ms ?? SPECTRO_STFT_WINDOW_MS
          }
          onBlur={(v) => updateSpectroStftWindowMs(extractor, v)}
          intent={isSpectroStftWindowMsValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={
            extractor.spectro_stft_overlap_ratio ?? SPECTRO_STFT_OVERLAP_RATIO
          }
          onBlur={(v) => updateSpectroStftOverlapRatio(extractor, v)}
          intent={
            isSpectroStftOverlapRatioValid(extractor) ? 'success' : 'danger'
          }
          size="small"
        />
      </SectionCard>
    </>
  );
}
