import {Checkbox, Tooltip} from '@blueprintjs/core';
import {IndexImpl} from '@shared/enums.ts';
import {useMemo} from 'react';
import {useIndexSlug} from 'src/panels/metrics/hooks/use-index-slug.ts';
import {useIndexState} from 'src/panels/metrics/hooks/use-index-state.ts';
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
  [IndexImpl.leq_maad, 'The Leq using maad library.'],
  [IndexImpl.ht, 'The temporal entropy.'],
  [IndexImpl.hf, 'The frequency entropy.'],
  [IndexImpl.med, 'The temporal median.'],
  [IndexImpl.ndsi, 'The normalized difference soundscape index.'],
  [IndexImpl.aci, 'The acoustic complexity index.'],
  [IndexImpl.adi, 'The acoustic diversity index.'],
  [IndexImpl.bi, 'The bioacoustics index.'],
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
            items={Object.values(IndexImpl)}
            onSelect={(v) => update(ind, 'impl', v)}
            current={ind.impl}
            placeholder="Select implementation"
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
        <Tooltip
          content="Implementation"
          className="help grow"
        >
          <div className="flex grow center growh">impl</div>
        </Tooltip>
      </Drawer>

      <div>offset (ms)</div>
      <div>step (ms)</div>
      <div>persist</div>
    </GenericSection>
  );
}
