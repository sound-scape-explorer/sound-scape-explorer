import {INTEGRATION_DURATION} from '@shared/constants.ts';
import {type IntegrationDto} from '@shared/dtos.ts';
import {useCallback, useMemo} from 'react';
import {type ExtractionConfig} from 'src/interfaces.ts';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';

export function useIntegrationState(extraction: ExtractionConfig) {
  const {updateExtraction} = useExtractionState();

  const integrations = useMemo(
    () => extraction.integrations,
    [extraction.integrations],
  );

  const addIntegration = useCallback(() => {
    extraction.integrations.push({
      index: extraction.integrations.length,
      name: '',
      duration: INTEGRATION_DURATION,
    });

    updateExtraction(extraction);
  }, [extraction, updateExtraction]);

  const deleteIntegration = useCallback(
    (integration: IntegrationDto) => {
      const newIntegrations = extraction.integrations.filter(
        (i) => i.index !== integration.index,
      );
      newIntegrations.forEach((i, index) => {
        i.index = index;
      });
      extraction.integrations = newIntegrations;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateIndex = useCallback(
    (integration: IntegrationDto, index: number) => {
      const newIntegrations = [...extraction.integrations];
      const newIndex = integration.index + index;

      if (newIndex < 0 || newIndex >= extraction.integrations.length) {
        return;
      }

      const existing = newIntegrations.find((i) => i.index === newIndex);
      const updated = newIntegrations.find(
        (i) => i.index === integration.index,
      );
      if (existing && updated) {
        existing.index = integration.index;
        updated.index = newIndex;
      }

      extraction.integrations = newIntegrations;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateName = useCallback(
    (integration: IntegrationDto, name: string) => {
      integration.name = name;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  const updateDuration = useCallback(
    (integration: IntegrationDto, duration: number) => {
      integration.duration = duration;
      updateExtraction(extraction);
    },
    [extraction, updateExtraction],
  );

  return {
    integrations,
    addIntegration,
    deleteIntegration,
    updateIndex,
    updateName,
    updateDuration,
  };
}
