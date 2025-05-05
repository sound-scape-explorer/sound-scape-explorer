import {type ExtractionDto, type IntegrationDto} from '@shared/dtos';
import {useCallback} from 'react';
import {createDefaultValidation, isInt} from 'src/utils/validation';

export function useIntegrationValidation() {
  const isNameValid = useCallback(
    (integration: IntegrationDto, extraction: ExtractionDto) => {
      if (integration.name === '') {
        return false;
      }

      const names = extraction.integrations
        .filter((i) => i.index !== integration.index)
        .map((i) => i.name);

      // noinspection RedundantIfStatementJS
      if (names.includes(integration.name)) {
        return false;
      }

      return true;
    },
    [],
  );

  const isDurationValid = useCallback(
    (integration: IntegrationDto, extraction: ExtractionDto) => {
      if (integration.duration <= 0) {
        return false;
      }

      if (!isInt(integration.duration)) {
        return false;
      }

      const durations = extraction.integrations
        .filter((i) => i.index !== integration.index)
        .map((i) => i.duration);

      const alreadyExists = durations.includes(integration.duration);

      // noinspection RedundantIfStatementJS
      if (alreadyExists) {
        return false;
      }

      const maxExtractorWindow = Math.max(
        ...extraction.extractors.map((e) => e.window),
      );
      const isBelowExtractorWindows = integration.duration < maxExtractorWindow;

      // noinspection RedundantIfStatementJS
      if (isBelowExtractorWindows) {
        return false;
      }

      return true;
    },
    [],
  );

  const validate = useCallback(
    (extraction: ExtractionDto) => {
      const v = createDefaultValidation();
      const l = extraction.integrations.length;
      v.intent = l > 0 ? 'success' : 'primary';
      v.content = `${l} ${l > 1 ? 'integrations' : 'integration'}`;

      if (l === 0) {
        v.intent = 'danger';
        v.content = 'empty';
        return v;
      }

      for (const integration of extraction.integrations) {
        if (!isNameValid(integration, extraction)) {
          v.intent = 'warning';
          v.content = 'invalid names';
          break;
        }

        if (!isDurationValid(integration, extraction)) {
          v.intent = 'warning';
          v.content = 'invalid durations';
          break;
        }
      }

      return v;
    },
    [isNameValid, isDurationValid],
  );

  return {
    validate,
    isNameValid,
    isDurationValid,
  };
}
