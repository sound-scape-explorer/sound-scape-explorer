import {useColorUser} from 'src/composables/use-color-user';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {onMounted, watch} from 'vue';

export function useColorLifecycles() {
  const {domain, generateScale} = useColorUser();
  const {flavor} = useColorSelection();

  watch([domain, flavor], generateScale);
  onMounted(generateScale);
}
