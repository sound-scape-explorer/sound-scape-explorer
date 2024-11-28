import {useMemo} from 'react';
import {getEnumKeys} from 'src/enums.ts';
import {useExtractorSlug} from 'src/panels/metrics/hooks/use-extractor-slug.ts';
import {
  ConfigExtractorType,
  useExtractorState,
} from 'src/panels/metrics/hooks/use-extractor-state.ts';
import {useExtractorValidation} from 'src/panels/metrics/hooks/use-extractor-validation.ts';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {Select} from 'src/primitives/select.tsx';

import styles from './metrics-extractors.module.scss';

export function MetricsExtractors() {
  const {extractors, add, update} = useExtractorState();
  const {getSlug} = useExtractorSlug();
  const {isTypeValid, validate} = useExtractorValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Extractors"
      getSlug={getSlug}
      items={extractors}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      renderItem={(ex) => (
        <>
          <Select
            items={getEnumKeys(ConfigExtractorType)}
            onSelect={(type) => update(ex, 'type', type)}
            current={ex.type}
            placeholder="Select types"
            intent={isTypeValid(ex) ? 'success' : 'danger'}
          />
        </>
      )}
    >
      <div>type</div>
    </GenericSection>
  );
}
