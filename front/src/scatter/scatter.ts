import Plotly, {
  type Layout,
  type PlotlyHTMLElement,
  type PlotMouseEvent,
} from 'plotly.js-dist-min';
import {useClientSettings} from 'src/composables/client-settings';
import {useScatterCamera} from 'src/scatter/scatter-camera';
import {useScatterClick} from 'src/scatter/scatter-click';
import {useScatterConfig} from 'src/scatter/scatter-config';
import {useScatterTraces} from 'src/scatter/scatter-traces';
import {computed, onMounted, ref, watchEffect} from 'vue';

const container = ref<PlotlyHTMLElement | null>(null);
const isAttached = ref<boolean>(false);
const hasRenderedFirstTime = ref<boolean>(false);

export function useScatter() {
  const {handleClick} = useScatterClick();
  const {config} = useScatterConfig();
  const {isLocked} = useScatterCamera();
  const {traces} = useScatterTraces();
  const {plotBackground} = useClientSettings();

  const handlePlotlyClick = (data: PlotMouseEvent) => {
    const intervalIndex = data.points[0].pointNumber;
    handleClick(intervalIndex);
  };

  const layout = computed<Partial<Layout> | null>(() => {
    // noinspection SpellCheckingInspection
    const l: Partial<Layout> = {
      margin: {
        t: 0,
        r: 0,
        b: 0,
        l: 0,
      },
      plot_bgcolor: plotBackground.value,
      yaxis: {
        scaleanchor: 'x',
        scaleratio: 1,
      },
      showlegend: false,
    };

    return l;
  });

  const renderInitial = async () => {
    if (
      container.value === null ||
      layout.value === null ||
      hasRenderedFirstTime.value === true
    ) {
      return;
    }

    await Plotly.newPlot(container.value, [], layout.value, config);
    hasRenderedFirstTime.value = true;
    console.log('first render');
  };

  onMounted(renderInitial);

  const attachListeners = () => {
    if (
      container.value === null ||
      hasRenderedFirstTime.value === false ||
      isAttached.value === true
    ) {
      return;
    }

    container.value.on('plotly_click', handlePlotlyClick);
    isAttached.value = true;
  };

  watchEffect(attachListeners);

  const render = async () => {
    if (
      hasRenderedFirstTime.value === false ||
      container.value === null ||
      layout.value === null
    ) {
      return;
    }

    await Plotly.react(container.value, traces.value, layout.value, config);
    console.log('render');
  };

  watchEffect(render);

  return {
    container: container,
    isLocked: isLocked,
  };
}
