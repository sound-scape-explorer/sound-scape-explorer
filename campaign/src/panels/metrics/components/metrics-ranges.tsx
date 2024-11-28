import {useMemo} from 'react';
import {useRangeSlug} from 'src/panels/metrics/hooks/use-range-slug.ts';
import {useRangeState} from 'src/panels/metrics/hooks/use-range-state.ts';
import {useRangeValidation} from 'src/panels/metrics/hooks/use-range-validation.ts';
import {DatePicker} from 'src/primitives/date-picker.tsx';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './metrics-ranges.module.scss';

export function MetricsRanges() {
  const {ranges, add, update} = useRangeState();
  const {getSlug} = useRangeSlug();
  const {isNameValid, isStartValid, isEndValid, validate} =
    useRangeValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Ranges"
      getSlug={getSlug}
      items={ranges}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      renderItem={(range) => (
        <>
          <TextInput
            defaultValue={range.name}
            onBlur={(v) => update(range, 'name', v)}
            intent={isNameValid(range) ? 'success' : 'danger'}
          />

          <DatePicker
            value={range.start}
            onChange={(n) => n !== null && update(range, 'start', n)}
            intent={isStartValid(range) ? 'success' : 'danger'}
          />

          <DatePicker
            value={range.end}
            onChange={(n) => n !== null && update(range, 'end', n)}
            intent={isEndValid(range) ? 'success' : 'danger'}
          />
        </>
      )}
    >
      <div>name</div>
      <div>start</div>
      <div>end</div>
    </GenericSection>
  );
}
