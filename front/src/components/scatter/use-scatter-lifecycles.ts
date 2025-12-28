import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterContainer} from 'src/components/scatter/use-scatter-container';
import {useScatterFilterAcoustic} from 'src/components/scatter/use-scatter-filter-acoustic';
import {useScatterFilterCalendar} from 'src/components/scatter/use-scatter-filter-calendar';
import {useScatterFilterSpatial} from 'src/components/scatter/use-scatter-filter-spatial';
import {useScatterFilterTag} from 'src/components/scatter/use-scatter-filter-tag';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {useScatterTrajectoryCyclingPeriod} from 'src/components/scatter/use-scatter-trajectory-cycling-period';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useInterval} from 'src/composables/use-interval';
import {useColorByAcoustic} from 'src/draggables/colors/use-color-by-acoustic';
import {useColorByTag} from 'src/draggables/colors/use-color-by-tag';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useDraggableSelection} from 'src/draggables/selection/use-draggable-selection';
import {useSelectionState} from 'src/draggables/selection/use-selection-state';
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
  const {option: colorOption, flavor} = useColorSelection();
  const {colorsAlphaLow: opacityLow, colorsAlphaHigh: opacityHigh} =
    useClientSettings();
  const {
    timeshift,
    isColorMapSwapped,
    isSelectedPointHighlighted,
    scatterBorderWidth,
  } = useClientSettings();
  const {filtered: labelFiltered} = useScatterFilterTag();
  const {filtered: calendarFiltered} = useScatterFilterCalendar();
  const {filtered: acousticFiltered} = useScatterFilterAcoustic();
  const {filtered: spatialFiltered} = useScatterFilterSpatial();
  const {isWebGlScatter2d} = useClientSettings();
  const {min: acousticMin, max: acousticMax} = useColorByAcoustic();
  const {min: tagMin, max: tagMax} = useColorByTag();
  const {isEnabled: isTagNumericEnabled} = useTagNumeric();
  const {currentIndex} = useInterval();
  const {cyclingPeriod} = useScatterTrajectoryCyclingPeriod();

  const {isActive: isSelectionActive, isWireframe: isSelectionWireframe} =
    useDraggableSelection();
  const {xRange, yRange, zRange, xAngle, yAngle, zAngle} = useSelectionState();

  onMounted(mountContainer);

  watch([container, isMounted, isAttached], attachListeners);
  watch([container, data, isMounted, isAttached, config], renderContainer);

  watch(
    [
      colorOption,
      flavor,
      opacityLow,
      opacityHigh,
      acousticMin,
      acousticMax,
      tagMin,
      tagMax,
      isTagNumericEnabled,
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
      // selection
      isSelectionActive,
      isSelectionWireframe,
      xRange,
      yRange,
      zRange,
      xAngle,
      yAngle,
      zAngle,
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
  );
}
