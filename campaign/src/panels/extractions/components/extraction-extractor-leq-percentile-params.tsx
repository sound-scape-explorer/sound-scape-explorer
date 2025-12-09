import {SectionCard} from '@blueprintjs/core';
import {LEQ_PERCENTILE_VALUE, LEQ_SHORT_DT} from '@shared/constants';
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

export function ExtractionExtractorLeqPercentileParams({
  extraction,
  extractor,
}: Props) {
  const {updateLeqPercentileDt, updateLeqPercentileValue} =
    useExtractorState(extraction);
  const {isLeqPercentileDtValid, isLeqPercentileValueValid} =
    useExtractorValidation();

  return (
    <>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsLeqPercentile,
        )}
      >
        <code className="bp5-text-small">dt (s)</code>
        <code className="bp5-text-small">percentile</code>
      </SectionCard>
      <SectionCard
        className={clsx(
          styles.additionalParamsContent,
          styles.additionalParamsLeqPercentile,
        )}
      >
        <NumberInput
          defaultValue={extractor.leq_percentile_dt ?? LEQ_SHORT_DT}
          onBlur={(v) => updateLeqPercentileDt(extractor, v)}
          intent={isLeqPercentileDtValid(extractor) ? 'success' : 'danger'}
          size="small"
        />

        <NumberInput
          defaultValue={extractor.leq_percentile_value ?? LEQ_PERCENTILE_VALUE}
          onBlur={(v) => updateLeqPercentileValue(extractor, v)}
          intent={isLeqPercentileValueValid(extractor) ? 'success' : 'danger'}
          size="small"
        />
      </SectionCard>
    </>
  );
}
