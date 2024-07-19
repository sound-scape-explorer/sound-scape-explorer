import Plotly, {type PlotlyHTMLElement} from 'plotly.js-dist-min';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {useScatterClick} from 'src/components/scatter/use-scatter-click';
import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterLayout} from 'src/components/scatter/use-scatter-layout';
import {useScatterSelection} from 'src/components/scatter/use-scatter-selection';
import {useScatterTraces} from 'src/components/scatter/use-scatter-traces';
import {ref} from 'vue';

const container = ref<PlotlyHTMLElement | null>(null);
const isAttached = ref<boolean>(false);
const isMounted = ref<boolean>(false);
const isRendering = ref<boolean>(false);

export function useScatter() {
  const {config} = useScatterConfig();
  const {layout} = useScatterLayout();
  const {isLocked} = useScatterCamera();
  const {traces} = useScatterTraces();
  const {handleClick} = useScatterClick();
  const {handleSelected} = useScatterSelection();

  const mount = async () => {
    if (
      container.value === null ||
      layout.value === null ||
      isMounted.value === true
    ) {
      return;
    }

    isMounted.value = true;
    await Plotly.newPlot(container.value, [], layout.value, config.value);
    console.log('Scatter: First render');
  };

  const attachListeners = () => {
    if (
      container.value === null ||
      isMounted.value === false ||
      isAttached.value === true
    ) {
      return;
    }

    isAttached.value = true;

    container.value.on('plotly_click', handleClick);
    container.value.on('plotly_selected', handleSelected);
  };

  const render = async () => {
    if (
      isMounted.value === false ||
      isRendering.value === true ||
      container.value === null ||
      layout.value === null
    ) {
      return;
    }

    isRendering.value = true;
    await Plotly.react(
      container.value,
      traces.value,
      layout.value,
      config.value,
    );

    console.log('Scatter: Render');
    isRendering.value = false;
  };

  return {
    container: container,
    isLocked: isLocked,
    isMounted: isMounted,
    isAttached: isAttached,
    mount: mount,
    attachListeners: attachListeners,
    render: render,
  };
}
