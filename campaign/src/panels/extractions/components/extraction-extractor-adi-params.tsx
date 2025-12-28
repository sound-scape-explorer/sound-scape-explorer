import {Classes, SectionCard} from '@blueprintjs/core';
import {ADI_BIN_STEP, ADI_DB_THRESHOLD, ADI_IMPL} from '@shared/constants';
import {type ExtractorDto} from '@shared/dtos';
import {AdiImpl} from '@shared/enums';
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

export function ExtractionExtractorAdiParams({extraction, extractor}: Props) {
  const {updateAdiBinStep, updateAdiImpl, updateAdiDbThreshold} =
    useExtractorState(extraction);

  const {isAdiBinStepValid, isAdiDbThresholdValid} = useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsAdi,
        )}
      >
        <code className={Classes.TEXT_SMALL}>bin step</code>
        <code className={Classes.TEXT_SMALL}>impl</code>
        <code className={Classes.TEXT_SMALL}>dB threshold</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsAdi,
        )}
      >
        <NumberInput
          defaultValue={extractor.adi_bin_step ?? ADI_BIN_STEP}
          onBlur={(v) => updateAdiBinStep(extractor, v)}
          intent={isAdiBinStepValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <Select
          items={AdiImpl.options}
          current={extractor.adi_impl ?? ADI_IMPL}
          onSelect={(v) => updateAdiImpl(extractor, v)}
        />

        <NumberInput
          defaultValue={extractor.adi_db_threshold ?? ADI_DB_THRESHOLD}
          onBlur={(v) => updateAdiDbThreshold(extractor, v)}
          intent={isAdiDbThresholdValid(extractor) ? 'success' : 'danger'}
          size="small"
        />
      </SectionCard>
    </>
  );
}
