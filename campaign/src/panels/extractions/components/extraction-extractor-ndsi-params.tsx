import {Classes, SectionCard} from '@blueprintjs/core';
import {NDSI_BAND_ANTHRO, NDSI_BAND_BIO} from '@shared/constants';
import {type ExtractorDto} from '@shared/dtos';
import clsx from 'clsx';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useExtractorState} from 'src/panels/extractions/hooks/use-extractor-state.ts';
import {useExtractorValidation} from 'src/panels/extractions/hooks/use-extractor-validation.ts';
import {NumberInput} from 'src/primitives/number-input.tsx';

import styles from './config-extractors.module.scss';

interface Props {
  extraction: ExtractionConfig;
  extractor: ExtractorDto;
}

export function ExtractionExtractorNdsiParams({extraction, extractor}: Props) {
  const {
    updateNdsiBioLow,
    updateNdsiBioHigh,
    updateNdsiAnthroLow,
    updateNdsiAnthroHigh,
  } = useExtractorState(extraction);

  const {
    isNdsiBioLowValid,
    isNdsiBioHighValid,
    isNdsiAnthroLowValid,
    isNdsiAnthroHighValid,
  } = useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsNdsi,
        )}
      >
        <code className={Classes.TEXT_SMALL}>bio low (Hz)</code>
        <code className={Classes.TEXT_SMALL}>bio high (Hz)</code>
        <code className={Classes.TEXT_SMALL}>anthro low (Hz)</code>
        <code className={Classes.TEXT_SMALL}>anthro high (Hz)</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsNdsi,
        )}
      >
        <NumberInput
          defaultValue={extractor.ndsi_band_bio?.[0] ?? NDSI_BAND_BIO[0]}
          onBlur={(v) => updateNdsiBioLow(extractor, v)}
          intent={isNdsiBioLowValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={extractor.ndsi_band_bio?.[1] ?? NDSI_BAND_BIO[1]}
          onBlur={(v) => updateNdsiBioHigh(extractor, v)}
          intent={isNdsiBioHighValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={extractor.ndsi_band_anthro?.[0] ?? NDSI_BAND_ANTHRO[0]}
          onBlur={(v) => updateNdsiAnthroLow(extractor, v)}
          intent={isNdsiAnthroLowValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={extractor.ndsi_band_anthro?.[1] ?? NDSI_BAND_ANTHRO[1]}
          onBlur={(v) => updateNdsiAnthroHigh(extractor, v)}
          intent={isNdsiAnthroHighValid(extractor) ? 'success' : 'danger'}
          size="small"
        />
      </SectionCard>
    </>
  );
}
