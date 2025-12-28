import {Classes, SectionCard} from '@blueprintjs/core';
import {MED_FRAME_SIZE} from '@shared/constants';
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

export function ExtractionExtractorMedParams({extraction, extractor}: Props) {
  const {updateMedFrameSize} = useExtractorState(extraction);
  const {isMedFrameSizeValid} = useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsMed,
        )}
      >
        <code className={Classes.TEXT_SMALL}>frame size</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsMed,
        )}
      >
        <NumberInput
          defaultValue={extractor.med_frame_size ?? MED_FRAME_SIZE}
          onBlur={(v) => updateMedFrameSize(extractor, v)}
          intent={isMedFrameSizeValid(extractor) ? 'success' : 'danger'}
          size="small"
        />
      </SectionCard>
    </>
  );
}
