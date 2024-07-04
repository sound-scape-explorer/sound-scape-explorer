import {useStorageLabels} from 'src/composables/use-storage-labels';

export function useLabelsCalculation() {
  const {labelProperties, labelSets} = useStorageLabels();

  const isCalculable = (key: string) => {
    if (labelProperties.value === null || labelSets.value === null) {
      return;
    }

    const index = labelProperties.value.indexOf(key);
    const set = labelSets.value[index];

    let payload = true; // is calculable?

    for (const value of set) {
      const numeric = Number(value);

      if (isNaN(numeric)) {
        payload = false;
        break;
      }
    }

    return payload;
  };

  return {
    isCalculable: isCalculable,
  };
}
