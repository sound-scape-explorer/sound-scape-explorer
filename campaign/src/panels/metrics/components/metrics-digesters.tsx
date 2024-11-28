import {useMemo} from 'react';
import {getEnumKeys} from 'src/enums.ts';
import {useDigesterSlug} from 'src/panels/metrics/hooks/use-digester-slug.ts';
import {
  DigesterTypeNew,
  useDigesterState,
} from 'src/panels/metrics/hooks/use-digester-state.ts';
import {useDigesterValidation} from 'src/panels/metrics/hooks/use-digester-validation.ts';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {Select} from 'src/primitives/select.tsx';

import styles from './metrics-digesters.module.scss';

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
            items={getEnumKeys(DigesterTypeNew)}
            current={d.type}
            onSelect={(type) => update(d, 'type', type)}
            placeholder="Select type"
            intent={isTypeValid(d) ? 'success' : 'danger'}
          />
        </>
      )}
    >
      <div>type</div>
    </GenericSection>
  );
}
