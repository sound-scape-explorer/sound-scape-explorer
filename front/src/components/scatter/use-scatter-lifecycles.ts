import {useScatter} from 'src/components/scatter/use-scatter';
import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useScreen} from 'src/components/screen/use-screen';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {useColorByIndex} from 'src/draggables/colors/use-color-by-index';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {onMounted, watch} from 'vue';

let isRendering = false;

export function useScatterLifecycles() {
  const {traces, isEnabled, generate, renderTraces} = useScatterTraces();
  const {config} = useScatterConfig();
  const {container, isMounted, isAttached, attachListeners, render, mount} =
    useScatter();
  const {criteria, flavor} = useColorSelection();
  const {colorsAlphaLow: opacityLow, colorsAlphaHigh: opacityHigh} =
    useClientSettings();
  const {
    timeshift,
    isColorMapSwapped,
    isSelectedPointHighlighted,
    scatterBorderWidth,
  } = useClientSettings();
  const {filtered: labelFiltered} = useScatterFilterTag();
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {filtered: temporalFiltered} = useScatterFilterTemporal();
  const {selected} = useScreen();
  const {isWebGlScatter2d} = useClientSettings();
  const {min: indicatorRangeMin, max: indicatorRangeMax} = useColorByIndex();
  const {min: labelRangeMin, max: labelRangeMax} = useColorByTag();
  const {isEnabled: isColorByLabelsNumeric} = useTagNumeric();
  const {currentIntervalIndex} = useIntervalSelector();

  onMounted(mount);

  watch([container, isMounted, isAttached], attachListeners);
  watch([container, traces, isMounted, isAttached, config], render);

  watch(
    [
      criteria,
      flavor,
      opacityLow,
      opacityHigh,
      indicatorRangeMin,
      indicatorRangeMax,
      labelRangeMin,
      labelRangeMax,
      timeshift,
      labelFiltered,
      timeFiltered,
      temporalFiltered,
      selected,
      isWebGlScatter2d,
      isColorMapSwapped,
      isColorByLabelsNumeric,
      currentIntervalIndex,
      isSelectedPointHighlighted,
      scatterBorderWidth,
    ],
    async () => {
      if (isRendering || !isEnabled.value) {
        return;
      }

      isRendering = true;
      await generate();
      renderTraces();
      isRendering = false;
    },
  );
}
