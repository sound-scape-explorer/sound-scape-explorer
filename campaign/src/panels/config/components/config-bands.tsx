import {useMemo} from 'react';
import {useBandSlug} from 'src/panels/config/hooks/use-band-slug.ts';
import {useBandState} from 'src/panels/config/hooks/use-band-state.ts';
import {useBandValidation} from 'src/panels/config/hooks/use-band-validation.ts';
import {useConfigTemplates} from 'src/panels/config/hooks/use-config-templates.ts';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {NumberInput} from 'src/primitives/number-input';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './config-bands.module.scss';

export function ConfigBands() {
  const {hasTemplate} = useConfigTemplates();
  const {bands, add, update} = useBandState();
  const {getSlug} = useBandSlug();
  const {isNameValid, isLowValid, isHighValid, validate} = useBandValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Bands"
      getSlug={getSlug}
      items={bands}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      disabled={hasTemplate}
      renderItem={(band) => (
        <>
          <TextInput
            defaultValue={band.name}
            onBlur={(v) => update(band, 'name', v)}
            intent={isNameValid(band) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />

          <NumberInput
            defaultValue={band.low}
            onBlur={(n) => update(band, 'low', n)}
            intent={isLowValid(band) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />

          <NumberInput
            defaultValue={band.high}
            onBlur={(n) => update(band, 'high', n)}
            intent={isHighValid(band) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />
        </>
      )}
    >
      <div>name</div>
      <div>low freq. (Hz)</div>
      <div>high freq. (Hz)</div>
    </GenericSection>
  );
}
