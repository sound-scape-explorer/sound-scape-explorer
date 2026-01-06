import {useMemo} from 'react';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {useExtractionValidation} from 'src/panels/extractions/hooks/use-extraction-validation';

export function useExtractionGlobalValidation() {
  const {extractions} = useExtractionState();
  const {validate} = useExtractionValidation();

  const isValid = useMemo(() => {
    let valid = true;

    for (const extraction of extractions) {
      if (!validate(extraction)) {
        valid = false;
        break;
      }
    }

    return valid;
  }, [extractions, validate]);

  return {
    isValid,
  };
}
