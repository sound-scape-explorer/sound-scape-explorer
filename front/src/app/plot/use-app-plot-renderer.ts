import Plotly from 'plotly.js-dist-min';
import {type AppPlotProps, type AppPlotRefs} from 'src/app/plot/app-plot.vue';
import {useInterval} from 'src/composables/use-interval';

export function useAppPlotRenderer(props: AppPlotProps, refs: AppPlotRefs) {
  const {selectInterval} = useInterval();

  const render = async () => {
    if (
      refs.container.value === null ||
      refs.data.value === null ||
      refs.layout.value === null ||
      refs.config.value === null
    ) {
      return;
    }

    refs.plot.value = await Plotly.newPlot(
      refs.container.value,
      refs.data.value,
      refs.layout.value,
      refs.config.value,
    );

    if (props?.clickEnabled) {
      refs.plot.value.on('plotly_click', (e) => {
        const plotIndex = e.points[0].pointIndex;
        // @ts-expect-error: missing typescript definition
        const legendString: string = e.points[0].fullData.x[plotIndex];
        const intervalIndex = legendString.split('Interval: ')[1];
        selectInterval(Number(intervalIndex));
      });
    }
  };

  return {
    render,
  };
}
