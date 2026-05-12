import {waitForPaint} from '@shared/browser';
import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterContainer} from 'src/components/scatter/use-scatter-container';
import {useScatterFilterAcoustic} from 'src/components/scatter/use-scatter-filter-acoustic';
import {useScatterFilterCalendar} from 'src/components/scatter/use-scatter-filter-calendar';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {useScatterState} from 'src/components/scatter/use-scatter-state';
import {useScatterTrajectoryCyclingPeriod} from 'src/components/scatter/use-scatter-trajectory-cycling-period';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useIntervalTransport} from 'src/composables/use-interval-transport';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColoringState} from 'src/draggables/colors/use-coloring-state';
import {useSelectionBoxes} from 'src/draggables/selection/use-selection-boxes';
import {nextTick, onMounted, watch} from 'vue';

export function useScatterLifecycles() {
  const {config} = useScatterConfig();
  const {isWebGlScatter2d} = useClientSettings();

  const {isRendering, isEnabled} = useScatterState();
  const {data, generate, render: renderScatter} = useScatterRender();

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
      if (isRendering.value || !isEnabled.value) {
        return;
      }

      isRendering.value = true;
      await nextTick();
      await waitForPaint();

      renderScatter(); // traces
      await generate(); // colors

      isRendering.value = false;
    },
    {deep: true},
  );
}
