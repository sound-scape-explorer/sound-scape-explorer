import {Checkbox} from '@blueprintjs/core';
import {useMemo} from 'react';
import {useIndexSlug} from 'src/panels/metrics/hooks/use-index-slug.ts';
import {
  MetricsIndexType,
  useIndexState,
} from 'src/panels/metrics/hooks/use-index-state.ts';
import {useIndexValidation} from 'src/panels/metrics/hooks/use-index-validation.ts';
import {Drawer} from 'src/primitives/drawer.tsx';
import {
  DrawerContent,
  type DrawerContentProps,
} from 'src/primitives/drawer-content.tsx';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {NumberInput} from 'src/primitives/number-input.tsx';
import {Select} from 'src/primitives/select.tsx';

import styles from './metrics-indices.module.scss';

const drawer: DrawerContentProps['content'] = [
  [MetricsIndexType.leq_maad, 'The Leq using maad library'],
  [MetricsIndexType.ht, 'The temporal entropy'],
  [MetricsIndexType.hf, 'The frequency entropy'],
  [MetricsIndexType.med, 'The temporal median'],
  [MetricsIndexType.ndsi, 'The normalized difference soundscape index'],
  [MetricsIndexType.aci, 'The acoustic complexity index'],
  [MetricsIndexType.adi, 'The acoustic diversity index'],
  [MetricsIndexType.bi, 'The bioacoustics index'],
];

export function MetricsIndices() {
  const {indices, add, update} = useIndexState();
  const {getSlug} = useIndexSlug();
  const {validate, isTypeValid, isOffsetValid, isStepValid} =
    useIndexValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Indices"
      getSlug={getSlug}
      items={indices}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      renderItem={(ind) => (
        <>
          <Select
            items={Object.values(MetricsIndexType)}
            onSelect={(type) => update(ind, 'type', type)}
            current={ind.type}
            placeholder="Select types"
            intent={isTypeValid(ind) ? 'success' : 'danger'}
          />

          <NumberInput
            defaultValue={ind.offset}
            onBlur={(n) => update(ind, 'offset', n)}
            intent={isOffsetValid(ind) ? 'success' : 'danger'}
          />

          <NumberInput
            defaultValue={ind.step}
            onBlur={(n) => update(ind, 'step', n)}
            intent={isStepValid(ind) ? 'success' : 'danger'}
          />

          <Checkbox
            className="checkbox"
            checked={ind.isPersist}
            onChange={(e) => update(ind, 'isPersist', e.currentTarget.checked)}
          />
        </>
      )}
    >
      <Drawer content={<DrawerContent content={drawer} />}>
        <div className="help flex grow center">type</div>
      </Drawer>

      <div>offset (ms)</div>
      <div>step (ms)</div>
      <div>persist</div>
    </GenericSection>
  );
}
