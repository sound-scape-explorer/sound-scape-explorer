import {type AutoclusterDto, type ExtractionDto} from '@shared/dtos';
import {useCallback} from 'react';
import {createDefaultValidation, isInt} from 'src/utils/validation';

export function useAutoclustersValidation() {
  const isMinClusterSizeValid = useCallback((autocluster: AutoclusterDto) => {
    return isInt(autocluster.minClusterSize) && autocluster.minClusterSize > 0;
  }, []);

  const isMinSamplesValid = useCallback((autocluster: AutoclusterDto) => {
    return isInt(autocluster.minSamples) && autocluster.minSamples > 0;
  }, []);

  const isAlphaValid = useCallback((autocluster: AutoclusterDto) => {
    return autocluster.alpha >= 0;
  }, []);

  const isEpsilonValid = useCallback((autocluster: AutoclusterDto) => {
    return autocluster.epsilon >= 0;
  }, []);

  const validate = useCallback((extraction: ExtractionDto) => {
    const v = createDefaultValidation();
    const l = extraction.autoclusters.length;
    v.intent = l > 0 ? 'success' : 'primary';
    v.content = `${l} ${l > 1 ? 'autoclusters' : 'autocluster'}`;

    return v;
  }, []);

  return {
    validate,
    isMinClusterSizeValid,
    isMinSamplesValid,
    isAlphaValid,
    isEpsilonValid,
  };
}
