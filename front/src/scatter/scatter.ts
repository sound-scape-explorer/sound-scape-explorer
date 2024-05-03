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

export function useScatter() {
  const container = ref<PlotlyHTMLElement | null>(null);
  const {handleClick} = useScatterClick();
  const {config} = useScatterConfig();
  const {isLocked} = useScatterCamera();
  const {traces} = useScatterTraces();
  const {plotBackground} = useClientSettings();

  const handlePlotlyClick = (data: PlotMouseEvent) => {
    const intervalIndex = data.points[0].pointNumber;
    handleClick(intervalIndex);
  };

  const layoutRef = computed<Partial<Layout> | null>(() => {
    // noinspection SpellCheckingInspection
    const layout: Partial<Layout> = {
      // title: 'hello',
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

    return layout;
  });

  const isFirstRenderedRef = ref<boolean>(false);

  const renderInitial = async () => {
    if (
      container.value === null ||
      layoutRef.value === null ||
      isFirstRenderedRef.value === true
    ) {
      return;
    }

    await Plotly.newPlot(container.value, [], layoutRef.value, config);
    isFirstRenderedRef.value = true;
    console.log('first render');
  };

  onMounted(renderInitial);

  const isAttachedRef = ref<boolean>(false);
  const attachListeners = () => {
    if (
      container.value === null ||
      isFirstRenderedRef.value === false ||
      isAttachedRef.value === true
    ) {
      return;
    }

    container.value.on('plotly_click', handlePlotlyClick);
    isAttachedRef.value = true;
  };

  watchEffect(attachListeners);

  const render = async () => {
    if (
      isFirstRenderedRef.value === false ||
      container.value === null ||
      layoutRef.value === null
    ) {
      return;
    }

    await Plotly.react(container.value, traces.value, layoutRef.value, config);
    console.log('render');
  };

  watchEffect(render);

  return {
    container: container,
    isLocked: isLocked,
  };
}
