import type {Data} from 'plotly.js-dist-min';
import {useColorSelection} from 'src/components/scatter/color-selection';
import {useScatterColorAlpha} from 'src/components/scatter/scatter-color-alpha';
import {useScatterColorScale} from 'src/components/scatter/scatter-color-scale';
import {useScatterFeatures} from 'src/components/scatter/scatter-features';
import {useScatterFilterLabel} from 'src/components/scatter/scatter-filter-label';
import {useScatterFilterTime} from 'src/components/scatter/scatter-filter-time';
import {useScreen} from 'src/components/screen/screen';
import {useClientSettings} from 'src/composables/client-settings';
import {useTrajectoriesData} from 'src/composables/trajectories-data';
import {traceAverageTrajectory} from 'src/utils/trace-average-trajectory';
import {traceTrajectories} from 'src/utils/trace-trajectories';
import {ref, watch} from 'vue';

const traces = ref<Data[]>([]);
const isEnabled = ref<boolean>(false);
let isRendering = false;

export function useScatterTraces() {
  const {traceFeatures} = useScatterFeatures();
  const {traceds, isFused} = useTrajectoriesData();
  const {cyclingScale, generateColorScale: generate} = useScatterColorScale();
  const {type, flavor} = useColorSelection();
  const {low, high} = useScatterColorAlpha();
  const {timeShift} = useClientSettings();
  const {filtered: labelFiltered} = useScatterFilterLabel();
  const {filtered: timeFiltered} = useScatterFilterTime();
  const {selected} = useScreen();

  const render = () => {
    console.log('render traces');
    let newTraces: Data[] = [];

    // add features
    const featuresTraces = traceFeatures();
    newTraces = [...newTraces, ...featuresTraces];

    // add trajectories
    if (traceds.value.length > 0) {
      if (isFused.value === true) {
        const averageTrace = traceAverageTrajectory(
          traceds.value,
          cyclingScale.value,
        );
        newTraces = [...newTraces, averageTrace];
      } else {
        const trajectories = traceTrajectories(
          traceds.value,
          cyclingScale.value,
        );
        newTraces = [...newTraces, ...trajectories];
      }
    }

    traces.value = newTraces;
  };

  const reset = () => {
    traces.value = [];
    isFused.value = false;
    traceds.value = [];
  };

  // todo: i don't know why this gets triggered so many times...
  // todo: time shift should trigger only the concerned color scales generation functions
  watch(
    [type, flavor, low, high, timeShift, labelFiltered, timeFiltered, selected],
    async () => {
      if (isRendering) {
        return;
      }

      isRendering = true;
      await generate();
      render();
      isRendering = false;
    },
  );

  return {
    isEnabled: isEnabled,
    traces: traces,
    renderTraces: render,
    resetTraces: reset,
  };
}
