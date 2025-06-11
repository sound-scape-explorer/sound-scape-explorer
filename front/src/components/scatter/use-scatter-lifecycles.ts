import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterContainer} from 'src/components/scatter/use-scatter-container';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {useScatterTrajectoryCyclingPeriod} from 'src/components/scatter/use-scatter-trajectory-cycling-period';
import {useScreen} from 'src/components/screen/use-screen';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useInterval} from 'src/composables/use-interval';
import {useColorByIndex} from 'src/draggables/colors/use-color-by-index';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useTagNumeric} from 'src/draggables/tags/use-tag-numeric';
import {onMounted, watch} from 'vue';

let isRendering = false;

export function useScatterLifecycles() {
  const {data, isEnabled, generate, render: renderScatter} = useScatterRender();
  const {config} = useScatterConfig();
  const {
    container,
    isMounted,
    isAttached,
    attachListeners,
    render: renderContainer,
    mount: mountContainer,
  } = useScatterContainer();
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
  const {currentIndex} = useInterval();
  const {cyclingPeriod} = useScatterTrajectoryCyclingPeriod();

  onMounted(mountContainer);

  watch([container, isMounted, isAttached], attachListeners);
  watch([container, data, isMounted, isAttached, config], renderContainer);

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
      currentIndex,
      isSelectedPointHighlighted,
      scatterBorderWidth,
      cyclingPeriod,
    ],
    async () => {
      if (isRendering || !isEnabled.value) {
        return;
      }

      isRendering = true;
      await generate();
      renderScatter();
      isRendering = false;
    },
  );
}
