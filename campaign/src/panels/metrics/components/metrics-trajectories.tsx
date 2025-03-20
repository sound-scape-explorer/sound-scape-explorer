import {TrajectoryStep} from '@shared/enums.ts';
import {useMemo} from 'react';
import {useFilesLabels} from 'src/panels/files/hooks/use-files-labels.ts';
import {useTrajectorySlug} from 'src/panels/metrics/hooks/use-trajectory-slug.ts';
import {useTrajectoryState} from 'src/panels/metrics/hooks/use-trajectory-state.ts';
import {useTrajectoryValidation} from 'src/panels/metrics/hooks/use-trajectory-validation.ts';
import {DatePicker} from 'src/primitives/date-picker.tsx';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {Select} from 'src/primitives/select.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './metrics-trajectories.module.scss';

export function MetricsTrajectories() {
  const {trajectories, add, update} = useTrajectoryState();
  const {getSlug} = useTrajectorySlug();
  const {
    validate,
    isNameValid,
    isLabelPropertyValid,
    isLabelValueValid,
    isStartValid,
    isEndValid,
  } = useTrajectoryValidation();
  const validation = useMemo(() => validate(), [validate]);
  const {properties} = useFilesLabels();

  return (
    <GenericSection
      title="Trajectories"
      getSlug={getSlug}
      items={trajectories}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      disabled={properties.length === 0}
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
            intent={isStartValid(t) ? 'success' : 'danger'}
            small
          />

          <DatePicker
            value={t.end}
            onChange={(d) => d !== null && update(t, 'end', d)}
            intent={isEndValid(t) ? 'success' : 'danger'}
            small
          />

          <Select
            items={properties}
            current={t.labelProperty ?? null}
            onSelect={(v) => update(t, 'labelProperty', v)}
            placeholder="Select"
            intent={isLabelPropertyValid(t) ? 'success' : 'danger'}
          />

          <TextInput
            defaultValue={t.labelValue}
            onBlur={(v) => update(t, 'labelValue', v)}
            intent={isLabelValueValid(t) ? 'success' : 'danger'}
          />

          <Select
            items={Object.values(TrajectoryStep)}
            current={t.step}
            onSelect={(s) => update(t, 'step', s)}
            placeholder="step"
          />
        </>
      )}
    >
      <div>name</div>
      <div>start</div>
      <div>end</div>
      <div>property</div>
      <div>value</div>
      <div>step</div>
    </GenericSection>
  );
}
