import {useCallback} from 'react';
import {
  type ConfigAutocluster,
  useAutoclusterState,
} from 'src/panels/metrics/hooks/use-autocluster-state.ts';
import {useGenericSectionValidation} from 'src/primitives/generic-section/use-generic-section-validation.ts';

export function useAutoclusterValidation() {
  const {createValidation} = useGenericSectionValidation();
  const {autoclusters} = useAutoclusterState();

  const isMinClusterSizeValid = useCallback(
    (autocluster: ConfigAutocluster) => {
      return autocluster.minClusterSize > 0;
    },
    [],
  );

  const isMinSamplesValid = useCallback((autocluster: ConfigAutocluster) => {
    return autocluster.minSamples > 0;
  }, []);

  const isAlphaValid = useCallback((autocluster: ConfigAutocluster) => {
    return autocluster.alpha > 0;
  }, []);

  const isEpsilonValid = useCallback((autocluster: ConfigAutocluster) => {
    return autocluster.epsilon > 0;
  }, []);

  const validate = useCallback(() => {
    const v = createValidation();
    const l = autoclusters.length;
    v.intent = l > 0 ? 'success' : 'primary';
    v.content = `${l} ${l > 1 ? 'autoclusters' : 'autocluster'}`;

    return v;
  }, [autoclusters, createValidation]);

  return {
    isMinClusterSizeValid,
    isMinSamplesValid,
    isAlphaValid,
    isEpsilonValid,
    validate,
  };
}
