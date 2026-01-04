import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterContainer} from 'src/components/scatter/use-scatter-container';
import {useScatterFilterAcoustic} from 'src/components/scatter/use-scatter-filter-acoustic';
import {useScatterFilterCalendar} from 'src/components/scatter/use-scatter-filter-calendar';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {useScatterTrajectoryCyclingPeriod} from 'src/components/scatter/use-scatter-trajectory-cycling-period';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useIntervalTransport} from 'src/composables/use-interval-transport';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {useSelectionBoxes} from 'src/draggables/selection/use-selection-boxes';
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
  const {
    timeshift,
    isColorMapSwapped,
    isSelectedPointHighlighted,
    scatterBorderWidth,
    colorsAlphaLow: opacityLow,
    colorsAlphaHigh: opacityHigh,
    colorsFlavor,
  } = useClientSettings();
  const {filtered: labelFiltered} = useScatterFilterTag();
  const {filtered: calendarFiltered} = useScatterFilterCalendar();
  const {filtered: acousticFiltered} = useScatterFilterAcoustic();
  const {filtered: spatialFiltered} = useScatterFilterSpatial();
  const {isWebGlScatter2d} = useClientSettings();
  const {min: acousticMin, max: acousticMax} = useColorByAcoustic();
  const {
    isNumericModeEnabled,
    numericRangeMin,
    numericRangeMax,
    option: colorOption,
  } = useColoringState();
  const {currentIndex} = useIntervalTransport();
  const {cyclingPeriod} = useScatterTrajectoryCyclingPeriod();

  const {boxes: selectionBoxes} = useSelectionBoxes();

  onMounted(mountContainer);

  watch([container, isMounted, isAttached], attachListeners);
  watch([container, data, isMounted, isAttached, config], renderContainer);

  watch(
    [
      colorOption,
      colorsFlavor,
      opacityLow,
      opacityHigh,
      acousticMin,
      acousticMax,
      isNumericModeEnabled,
      numericRangeMin,
      numericRangeMax,
      timeshift,
      labelFiltered,
      calendarFiltered,
      acousticFiltered,
      spatialFiltered,
      isWebGlScatter2d,
      isColorMapSwapped,
      currentIndex,
      isSelectedPointHighlighted,
      scatterBorderWidth,
      cyclingPeriod,
      selectionBoxes,
    ],
    async () => {
      if (isRendering || !isEnabled.value) {
        return;
      }

      // TODO: investigate
      // requestAnimationFrame(async () => {
      //   await generate();
      //   renderScatter();
      // });

      isRendering = true;
      renderScatter();
      await generate();
      isRendering = false;
    },
    {deep: true},
  );
}
