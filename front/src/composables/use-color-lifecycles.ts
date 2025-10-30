import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useColorUser} from 'src/composables/use-color-user';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useColorAcousticSeries} from 'src/draggables/colors/use-color-acoustic-series';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {onMounted, watch} from 'vue';

export function useColorLifecycles() {
  const {domain, generateScale} = useColorUser();
  const {allUniques} = useTagUniques();
  const {generate} = useScatterColorScale();
  const {series} = useColorAcousticSeries();

  const {
    flavor,
    category,
    updateOptions,
    updateTagOptions,
    option,
    updateAcousticData,
  } = useColorSelection();

  onMounted(generateScale);
  watch([domain, flavor], generateScale);
  watch(category, updateOptions);
  watch(allUniques, updateTagOptions);
  watch(option, updateAcousticData);

  // to mitigate race conditions from slow series
  watch(series, generate);
}
