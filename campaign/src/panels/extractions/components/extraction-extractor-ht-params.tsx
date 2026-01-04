import {Classes, SectionCard} from '@blueprintjs/core';
import {HT_FRAME_SIZE} from '@shared/constants';
import {type ExtractorDto} from '@shared/dtos';
import clsx from 'clsx';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useExtractorState} from 'src/panels/extractions/hooks/use-extractor-state.ts';
import {useExtractorValidation} from 'src/panels/extractions/hooks/use-extractor-validation.ts';
import {NumberInput} from 'src/primitives/number-input.tsx';

import styles from './config-extractors.module.scss';

interface Props {
  readonly extraction: ExtractionConfig;
  readonly extractor: ExtractorDto;
}

export function ExtractionExtractorHtParams({extraction, extractor}: Props) {
  const {updateHtFrameSize} = useExtractorState(extraction);
  const {isHtFrameSizeValid} = useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsHt,
        )}
      >
        <code className={Classes.TEXT_SMALL}>frame size</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsHt,
        )}
      >
        <NumberInput
          defaultValue={extractor.ht_frame_size ?? HT_FRAME_SIZE}
          onBlur={(v) => updateHtFrameSize(extractor, v)}
          intent={isHtFrameSizeValid(extractor) ? 'success' : 'danger'}
          size="small"
        />
      </SectionCard>
    </>
  );
}
