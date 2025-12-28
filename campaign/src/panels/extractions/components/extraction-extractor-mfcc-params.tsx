import {Classes, SectionCard} from '@blueprintjs/core';
import {MFCC_N_MFCC} from '@shared/constants';
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

export function ExtractionExtractorMfccParams({extraction, extractor}: Props) {
  const {updateMfccNMfcc} = useExtractorState(extraction);
  const {isMfccNMfccValid} = useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsMfcc,
        )}
      >
        <code className={Classes.TEXT_SMALL}>n_mfcc</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsMfcc,
        )}
      >
        <NumberInput
          defaultValue={extractor.mfcc_n_mfcc ?? MFCC_N_MFCC}
          onBlur={(v) => updateMfccNMfcc(extractor, v)}
          intent={isMfccNMfccValid(extractor) ? 'success' : 'danger'}
          size="small"
        />
      </SectionCard>
    </>
  );
}
