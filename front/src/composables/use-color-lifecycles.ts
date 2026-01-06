import {useScatterColorScale} from 'src/components/scatter/use-scatter-color-scale';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useColorUser} from 'src/composables/use-color-user';
import {useTagUniques} from 'src/composables/use-tag-uniques';
import {useColorAcousticSeries} from 'src/draggables/colors/use-color-acoustic-series';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColorGradients} from 'src/draggables/colors/use-color-gradients';
import {useColorType} from 'src/draggables/colors/use-color-type';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {onMounted, watch} from 'vue';

export function useColorLifecycles() {
  const {
    isNumericModeEnabled,
    numericRangeMin,
    numericRangeMax,
    category,
    option,
    updateOptions,
    updateTagOptions,
    updateAcousticData,
    resetNumericRange,
  } = useColoringState();
  const {colorsFlavor} = useClientSettings();
  const {domain, generateScale} = useColorUser();
  const {allUniques} = useTagUniques();
  const {generate} = useScatterColorScale();
  const {series} = useColorAcousticSeries();
  const {updateLabels} = useColorGradients();
  const {isTagNumeric} = useColorType();
  const {disable} = useTagNumeric();
  const {min: acousticMin, max: acousticMax} = useColorByAcoustic();

  onMounted(generateScale);
  watch([domain, colorsFlavor], generateScale);
  watch(category, updateOptions);
  watch(allUniques, updateTagOptions);
  watch(option, updateAcousticData);

  // to mitigate race conditions from slow series
  watch(series, generate);

  // gradient labeling
  watch(
    [
      option,
      isNumericModeEnabled,
      isTagNumeric,
      acousticMin,
      acousticMax,
      numericRangeMin,
      numericRangeMax,
    ],
    () => {
      if (!isTagNumeric.value) {
        disable();
      }

      if (!isNumericModeEnabled.value) {
        resetNumericRange();
      }

      updateLabels();
    },
  );
}
