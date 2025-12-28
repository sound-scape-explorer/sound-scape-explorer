import {Classes, SectionCard} from '@blueprintjs/core';
import {
  LEQ_DIFF_PERCENTILE_A,
  LEQ_DIFF_PERCENTILE_B,
  LEQ_SHORT_DT,
} from '@shared/constants';
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

export function ExtractionExtractorLeqDiffParams({
  extraction,
  extractor,
}: Props) {
  const {updateLeqDiffDt, updateLeqDiffPercentileA, updateLeqDiffPercentileB} =
    useExtractorState(extraction);

  const {
    isLeqDiffDtValid,
    isLeqDiffPercentileAValid,
    isLeqDiffPercentileBValid,
  } = useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsLeqDiff,
        )}
      >
        <code className={Classes.TEXT_SMALL}>dt (s)</code>
        <code className={Classes.TEXT_SMALL}>percentile A</code>
        <code className={Classes.TEXT_SMALL}>percentile B</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsLeqDiff,
        )}
      >
        <NumberInput
          defaultValue={extractor.leq_diff_dt ?? LEQ_SHORT_DT}
          onBlur={(v) => updateLeqDiffDt(extractor, v)}
          intent={isLeqDiffDtValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={
            extractor.leq_diff_percentile_a ?? LEQ_DIFF_PERCENTILE_A
          }
          onBlur={(v) => updateLeqDiffPercentileA(extractor, v)}
          intent={isLeqDiffPercentileAValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={
            extractor.leq_diff_percentile_b ?? LEQ_DIFF_PERCENTILE_B
          }
          onBlur={(v) => updateLeqDiffPercentileB(extractor, v)}
          intent={isLeqDiffPercentileBValid(extractor) ? 'success' : 'danger'}
          size="small"
        />
      </SectionCard>
    </>
  );
}
