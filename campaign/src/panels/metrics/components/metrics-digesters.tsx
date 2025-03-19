import {useMemo} from 'react';
import {useDigesterSlug} from 'src/panels/metrics/hooks/use-digester-slug.ts';
import {
  DigesterType,
  useDigesterState,
} from 'src/panels/metrics/hooks/use-digester-state.ts';
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
    DigesterType.silhouette,
    'The silhouette between subtypes of a given cluster.',
  ],
  [DigesterType.contingency, 'Contingency between two clusters.'],
  [DigesterType.sum_var, 'The sum variance.'],
  [DigesterType.sum_std, 'The sum standard deviation.'],
  [DigesterType.mean_std, 'The mean standard deviation.'],
  [DigesterType.mean_spreading, 'The mean spreading.'],
  [DigesterType.distance, 'The distance between subtypes of a given cluster.'],
  [DigesterType.overlap, 'The overlap between subtypes of a given cluster.'],
];

export function MetricsDigesters() {
  const {digesters, add, update} = useDigesterState();
  const {getSlug} = useDigesterSlug();
  const {isTypeValid, validate} = useDigesterValidation();
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
            items={Object.values(DigesterType)}
            current={d.type}
            onSelect={(type) => update(d, 'type', type)}
            placeholder="Select type"
            intent={isTypeValid(d) ? 'success' : 'danger'}
          />
        </>
      )}
    >
      <Drawer content={<DrawerContent content={drawer} />}>
        <div className="help flex grow center">type</div>
      </Drawer>
    </GenericSection>
  );
}
