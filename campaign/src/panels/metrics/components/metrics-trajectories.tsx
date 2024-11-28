import {useMemo} from 'react';
import {useTrajectorySlug} from 'src/panels/metrics/hooks/use-trajectory-slug.ts';
import {useTrajectoryState} from 'src/panels/metrics/hooks/use-trajectory-state.ts';
import {useTrajectoryValidation} from 'src/panels/metrics/hooks/use-trajectory-validation.ts';
import {DatePicker} from 'src/primitives/date-picker.tsx';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './metrics-trajectories.module.scss';

export function MetricsTrajectories() {
  const {trajectories, add, update} = useTrajectoryState();
  const {getSlug} = useTrajectorySlug();
  const {isNameValid, validate} = useTrajectoryValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Trajectories"
      getSlug={getSlug}
      items={trajectories}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      renderItem={(t) => (
        <>
          <TextInput
            defaultValue={t.name}
            onBlur={(v) => update(t, 'name', v)}
            intent={isNameValid(t) ? 'success' : 'danger'}
          />

          <DatePicker
            value={t.start}
            onChange={(d) => d !== null && update(t, 'start', d)}
            small
          />

          <DatePicker
            value={t.end}
            onChange={(d) => d !== null && update(t, 'end', d)}
            small
          />

          <TextInput
            defaultValue={t.labelProperty}
            onBlur={(v) => update(t, 'labelProperty', v)}
          />

          <TextInput
            defaultValue={t.labelValue}
            onBlur={(v) => update(t, 'labelValue', v)}
          />

          <div>hello</div>
        </>
      )}
    >
      <div>name</div>
      <div>start</div>
      <div>end</div>
      <div>label property</div>
      <div>label value</div>
      <div>step</div>
    </GenericSection>
  );
}
