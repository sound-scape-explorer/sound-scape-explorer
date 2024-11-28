import {useMemo} from 'react';
import {useFileValidation} from 'src/hooks/use-file-validation.ts';
import {useSettingsValidation} from 'src/hooks/use-settings-validation.ts';
import {useConfigValidation} from 'src/panels/config/hooks/use-config-validation.ts';
import {useMetricsValidation} from 'src/panels/config/hooks/use-metrics-validation.ts';

export function useGlobalValidation() {
  const {isValid: isFileValid} = useFileValidation();
  const {isValid: isSettingsValid} = useSettingsValidation();
  const {isValid: isConfigValid} = useConfigValidation();
  const {isValid: isMetricsValid} = useMetricsValidation();

  const isValid = useMemo(
    () => isFileValid && isSettingsValid && isConfigValid && isMetricsValid,
    [isFileValid, isSettingsValid, isConfigValid, isMetricsValid],
  );

  return {
    isValid,
  };
}
