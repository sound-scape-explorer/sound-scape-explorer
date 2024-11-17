import {useColorUser} from 'src/composables/use-color-user';
import {useIndicators} from 'src/composables/use-indicators';
import {useStorageLabels} from 'src/composables/use-storage-labels';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {onMounted, watch} from 'vue';

export function useColorLifecycles() {
  const {domain, generateScale} = useColorUser();
  const {labelProperties} = useStorageLabels();
  const {names} = useIndicators();

  const {
    flavor,
    category,
    updateCriterias,
    criterias,
    criteria,
    updateCriteriaIndex,
    updateLabelCriterias,
    updateIndicatorCriterias,
  } = useColorSelection();

  onMounted(generateScale);

  watch([domain, flavor], generateScale);
  watch(category, updateCriterias);
  watch([criterias, criteria], updateCriteriaIndex);
  watch(labelProperties, updateLabelCriterias);
  watch(names, updateIndicatorCriterias);
}
