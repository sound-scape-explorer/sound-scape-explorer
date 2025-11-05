import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useColorUser} from 'src/composables/use-color-user';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useColorAcousticSeries} from 'src/draggables/colors/use-color-acoustic-series';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorGradients} from 'src/draggables/colors/use-color-gradients';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useColorState} from 'src/draggables/colors/use-color-state';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {onMounted, watch} from 'vue';

export function useColorLifecycles() {
  const {domain, generateScale} = useColorUser();
  const {allUniques} = useTagUniques();
  const {generate} = useScatterColorScale();
  const {series} = useColorAcousticSeries();
  const {reset, min: tagMin, max: tagMax} = useColorByTag();
  const {updateLabels} = useColorGradients();
  const {isTagNumeric} = useColorState();
  const {isEnabled: isTagNumericEnabled, disable} = useTagNumeric();
  const {min: acousticMin, max: acousticMax} = useColorByAcoustic();

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

  // gradient labeling
  watch(
    [
      option,
      isTagNumericEnabled,
      isTagNumeric,
      acousticMin,
      acousticMax,
      tagMin,
      tagMax,
    ],
    () => {
      if (!isTagNumeric.value) {
        disable();
      }

      if (!isTagNumericEnabled.value) {
        reset();
      }

      updateLabels();
    },
  );
}
