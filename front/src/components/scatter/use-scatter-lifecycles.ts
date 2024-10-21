import {useScatter} from 'src/components/scatter/use-scatter';
import {useScatterColorAlpha} from 'src/components/scatter/use-scatter-color-alpha';
import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterFilterLabels} from 'src/components/scatter/use-scatter-filter-labels';
import {useScatterFilterTemporal} from 'src/components/scatter/use-scatter-filter-temporal';
import {useScatterFilterTime} from 'src/components/scatter/use-scatter-filter-time';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {useScreen} from 'src/components/screen/use-screen';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {useColorByIndicator} from 'src/draggables/colors/use-color-by-indicator';
import {useColorByLabel} from 'src/draggables/colors/use-color-by-label';
import {useColorSelection} from 'src/draggables/colors/use-color-selection';
import {useLabelsNumeric} from 'src/draggables/labels/use-labels-numeric';
import {onMounted, watch} from 'vue';

let isRendering = false;

export function useScatterLifecycles() {
  const {traces, isEnabled, generate, renderTraces} = useScatterTraces();
  const {config} = useScatterConfig();
  const {container, isMounted, isAttached, attachListeners, render, mount} =
    useScatter();
  const {criteria, flavor} = useColorSelection();
  const {low: opacityLow, high: opacityHigh} = useScatterColorAlpha();
  const {timeshift, isColorMapSwapped, isSelectedPointHighlighted} =
    useClientSettings();
  const {filtered: labelFiltered} = useScatterFilterLabels();
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {filtered: temporalFiltered} = useScatterFilterTemporal();
  const {selected} = useScreen();
  const {isWebGlScatter2d} = useClientSettings();
  const {min: indicatorRangeMin, max: indicatorRangeMax} =
    useColorByIndicator();
  const {min: labelRangeMin, max: labelRangeMax} = useColorByLabel();
  const {isEnabled: isColorByLabelsNumeric} = useLabelsNumeric();
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
