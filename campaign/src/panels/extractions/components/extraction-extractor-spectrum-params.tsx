import {Classes, SectionCard} from '@blueprintjs/core';
import {
  SPECTRO_N_BANDS,
  SPECTRO_SCALE,
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

export function ExtractionExtractorSpectrumParams({
  extraction,
  extractor,
}: Props) {
  const {updateSpectroNBands, updateSpectroScale, updateSpectroStftWindowType} =
    useExtractorState(extraction);

  const {isSpectroNBandsValid} = useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsSpectrum,
        )}
      >
        <code className={Classes.TEXT_SMALL}>n_bands</code>
        <code className={Classes.TEXT_SMALL}>scale</code>
        <code className={Classes.TEXT_SMALL}>STFT window</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsSpectrum,
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
      </SectionCard>
    </>
  );
}
