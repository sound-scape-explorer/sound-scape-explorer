import {AutoclusterImpl} from '@shared/enums.ts';
import {useMemo} from 'react';
import {useAutoclusterSlug} from 'src/panels/metrics/hooks/use-autocluster-slug.ts';
import {useAutoclusterState} from 'src/panels/metrics/hooks/use-autocluster-state.ts';
import {useAutoclusterValidation} from 'src/panels/metrics/hooks/use-autocluster-validation.ts';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {NumberInput} from 'src/primitives/number-input.tsx';
import {Select} from 'src/primitives/select.tsx';

import styles from './metrics-autoclusters.module.scss';

export function MetricsAutoclusters() {
  const {autoclusters, add, update} = useAutoclusterState();
  const {getSlug} = useAutoclusterSlug();
  const {
    isMinClusterSizeValid,
    isMinSamplesValid,
    isAlphaValid,
    isEpsilonValid,
    validate,
  } = useAutoclusterValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Autoclusters"
      getSlug={getSlug}
      items={autoclusters}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      renderItem={(autocluster) => (
        <>
          <Select
            items={Object.values(AutoclusterImpl)}
            onSelect={(v) => update(autocluster, 'impl', v)}
            current={autocluster.impl}
            placeholder="Select implementation"
          />

          <NumberInput
            defaultValue={autocluster.minClusterSize}
            onBlur={(n) => update(autocluster, 'minClusterSize', n)}
            intent={isMinClusterSizeValid(autocluster) ? 'success' : 'danger'}
          />

          <NumberInput
            defaultValue={autocluster.minSamples}
            onBlur={(n) => update(autocluster, 'minSamples', n)}
            intent={isMinSamplesValid(autocluster) ? 'success' : 'danger'}
          />

          <NumberInput
            defaultValue={autocluster.alpha}
            onBlur={(n) => update(autocluster, 'alpha', n)}
            intent={isAlphaValid(autocluster) ? 'success' : 'danger'}
          />

          <NumberInput
            defaultValue={autocluster.epsilon}
            onBlur={(n) => update(autocluster, 'epsilon', n)}
            intent={isEpsilonValid(autocluster) ? 'success' : 'danger'}
          />
        </>
      )}
    >
      <div>impl</div>
      <div>min cluster size</div>
      <div>min samples</div>
      <div>alpha</div>
      <div>epsilon</div>
    </GenericSection>
  );
}
