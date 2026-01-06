import Plotly, {type PlotlyHTMLElement} from 'plotly.js-dist-min';
import {useScatterCamera} from 'src/components/scatter/use-scatter-camera';
import {useScatterClick} from 'src/components/scatter/use-scatter-click';
import {useScatterConfig} from 'src/components/scatter/use-scatter-config';
import {useScatterLayout} from 'src/components/scatter/use-scatter-layout';
import {useScatterRender} from 'src/components/scatter/use-scatter-render';
import {ref} from 'vue';

const container = ref<PlotlyHTMLElement | null>(null);
const isAttached = ref<boolean>(false);
const isMounted = ref<boolean>(false);
const isRendering = ref<boolean>(false);

export function useScatterContainer() {
  const {config} = useScatterConfig();
  const {layout} = useScatterLayout();
  const {isLocked} = useScatterCamera();
  const {data} = useScatterRender();
  const {handleClick} = useScatterClick();

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
    await Plotly.react(container.value, data.value, layout.value, config.value);

    console.log('Scatter: Render');
    isRendering.value = false;
  };

  return {
    container,
    isLocked,
    isMounted,
    isAttached,
    mount,
    attachListeners,
    render,
  };
}
