import {useMemo} from 'react';
import {useConfigTemplates} from 'src/panels/config/hooks/use-config-templates.ts';
import {useIntegrationSlug} from 'src/panels/config/hooks/use-integration-slug.ts';
import {useIntegrationState} from 'src/panels/config/hooks/use-integration-state.ts';
import {useIntegrationValidation} from 'src/panels/config/hooks/use-integration-validation.ts';
import {GenericSection} from 'src/primitives/generic-section/generic-section.tsx';
import {NumberInput} from 'src/primitives/number-input';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './config-integrations.module.scss';

export function ConfigIntegrations() {
  const {hasTemplate} = useConfigTemplates();
  const {getSlug} = useIntegrationSlug();
  const {integrations, add, update} = useIntegrationState();
  const {isNameValid, isDurationValid, validate} = useIntegrationValidation();
  const validation = useMemo(() => validate(), [validate]);

  return (
    <GenericSection
      title="Integrations"
      getSlug={getSlug}
      items={integrations}
      add={add}
      update={update}
      className={styles.row}
      validation={validation}
      disabled={hasTemplate}
      renderItem={(integration) => (
        <>
          <TextInput
            defaultValue={integration.name}
            onBlur={(v) => update(integration, 'name', v)}
            intent={isNameValid(integration) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />

          <NumberInput
            defaultValue={integration.duration}
            onBlur={(n) => update(integration, 'duration', n)}
            intent={isDurationValid(integration) ? 'success' : 'danger'}
            disabled={hasTemplate}
          />
        </>
      )}
    >
      <div>name</div>
      <div>duration</div>
    </GenericSection>
  );
}
