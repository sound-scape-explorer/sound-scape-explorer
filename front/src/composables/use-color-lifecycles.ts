import {useColorUser} from 'src/composables/use-color-user';
import {useIndicators} from 'src/composables/use-indicators';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {onMounted, watch} from 'vue';

export function useColorLifecycles() {
  const {domain, generateScale} = useColorUser();
  const {allUniques} = useTagUniques();
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
  watch(allUniques, updateLabelCriterias);
  watch(names, updateIndicatorCriterias);
}
