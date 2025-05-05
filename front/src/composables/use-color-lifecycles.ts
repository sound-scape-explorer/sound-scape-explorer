import {useColorUser} from 'src/composables/use-color-user';
import {useIndicators} from 'src/composables/use-indicators';
import {useLabelSets} from 'src/composables/use-label-sets';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {onMounted, watch} from 'vue';

export function useColorLifecycles() {
  const {domain, generateScale} = useColorUser();
  const {sets} = useLabelSets();
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
  watch(sets, updateLabelCriterias);
  watch(names, updateIndicatorCriterias);
}
