import {useCallback} from 'react';
import {
  type ConfigIntegration,
  useIntegrationState,
} from 'src/panels/config/hooks/use-integration-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useIntegrationValidation() {
  const {createValidation, collectValues} = useGenericSectionValidation();
  const {integrations} = useIntegrationState();

  const isNameValid = useCallback(
    (integration: ConfigIntegration) => {
      if (integration.name === '') {
        return false;
      }

      const names = collectValues(integrations, integration, 'name');

      // noinspection RedundantIfStatementJS
      if (names.includes(integration.name)) {
        return false;
      }

      return true;
    },
    [integrations, collectValues],
  );

  const isDurationValid = useCallback(
    (integration: ConfigIntegration) => integration.duration > 0,
    [],
  );

  const validate = useCallback(() => {
    const v = createValidation();

    if (integrations.length === 0) {
      v.intent = 'danger';
      v.content = 'empty';
      return v;
    }

    for (const integration of integrations) {
      if (!isNameValid(integration)) {
        v.intent = 'warning';
        v.content = 'invalid names';
        break;
      }

      if (!isDurationValid(integration)) {
        v.intent = 'warning';
        v.content = 'invalid durations';
        break;
      }
    }

    return v;
  }, [createValidation, integrations, isNameValid, isDurationValid]);

  return {
    isNameValid,
    isDurationValid,
    validate,
  };
}
