import {Callout} from '@blueprintjs/core';
import {useMemo} from 'react';
import {useDigesterSlug} from 'src/panels/metrics/hooks/use-digester-slug.ts';
import {
  DigesterType,
  useDigesterState,
} from 'src/panels/metrics/hooks/use-digester-state.ts';
import {useDigesterValidation} from 'src/panels/metrics/hooks/use-digester-validation.ts';
import {Drawer} from 'src/primitives/drawer.tsx';
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
            items={Object.values(DigesterType)}
            current={d.type}
            onSelect={(type) => update(d, 'type', type)}
            placeholder="Select type"
            intent={isTypeValid(d) ? 'success' : 'danger'}
          />
        </>
      )}
    >
      <Drawer
        content={
          <div className="flex column gap mt">
            <Callout
              compact
              title="Silhouette"
            >
              The silhouette between subtypes of a given cluster.
            </Callout>

            <Callout
              compact
              title="Contingency"
            >
              Contingency between two clusters.
            </Callout>
          </div>
        }
      >
        <div className="help flex grow center">type</div>
      </Drawer>
    </GenericSection>
  );
}
