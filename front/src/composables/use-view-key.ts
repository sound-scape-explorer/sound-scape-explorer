import {useViewSelection} from 'src/composables/use-view-selection';
import {computed} from 'vue';

export function useViewKey() {
  const {band, integration, extraction, reducer} = useViewSelection();

  const key = computed(() => {
    if (
      !extraction.value ||
      !band.value ||
      !integration.value ||
      !reducer.value
    ) {
      return null;
    }

    return `${extraction.value.index}-${band.value.index}-${integration.value.index}-${reducer.value.index}`;
  });

  return {
    key,
  };
}
