import {DigesterImpl} from '@shared/enums.ts';
import {useMemo} from 'react';
import {useDigesterSlug} from 'src/panels/metrics/hooks/use-digester-slug.ts';
import {useDigesterState} from 'src/panels/metrics/hooks/use-digester-state.ts';
import {useDigesterValidation} from 'src/panels/metrics/hooks/use-digester-validation.ts';
import {Drawer} from 'src/primitives/drawer.tsx';
import {
  DrawerContent,
  type DrawerContentProps,
} from 'src/primitives/drawer-content.tsx';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {Select} from 'src/primitives/select.tsx';

import styles from './metrics-digesters.module.scss';

const drawer: DrawerContentProps['content'] = [
  [
    DigesterImpl.silhouette,
    'The silhouette between subtypes of a given cluster.',
  ],
  [DigesterImpl.contingency, 'Contingency between two clusters.'],
  [DigesterImpl.sum_var, 'The sum variance.'],
  [DigesterImpl.sum_std, 'The sum standard deviation.'],
  [DigesterImpl.mean_std, 'The mean standard deviation.'],
  [DigesterImpl.mean_spreading, 'The mean spreading.'],
  [DigesterImpl.distance, 'The distance between subtypes of a given cluster.'],
  [DigesterImpl.overlap, 'The overlap between subtypes of a given cluster.'],
];

export function MetricsDigesters() {
  const {digesters, add, update} = useDigesterState();
  const {getSlug} = useDigesterSlug();
  const {isImplValid, validate} = useDigesterValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Digesters"
      getSlug={getSlug}
      items={digesters}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      renderItem={(d) => (
        <>
          <Select
            items={Object.values(DigesterImpl)}
            current={d.impl}
            onSelect={(v) => update(d, 'impl', v)}
            placeholder="Select impl"
            intent={isImplValid(d) ? 'success' : 'danger'}
          />
        </>
      )}
    >
      <Drawer content={<DrawerContent content={drawer} />}>
        <div className="help flex grow center">impl</div>
      </Drawer>
    </GenericSection>
  );
}
