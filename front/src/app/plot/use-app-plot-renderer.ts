import Plotly from 'plotly.js-dist-min';
import {type AppPlotProps, type AppPlotRefs} from 'src/app/plot/app-plot.vue';
import {useIntervalTransport} from 'src/composables/use-interval-transport';
import {INTERVAL_TAG} from 'src/draggables/temporal/use-temporal-chart';

export function useAppPlotRenderer(props: AppPlotProps, refs: AppPlotRefs) {
  const {selectInterval} = useIntervalTransport();

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

        const match = legendString.match(
          new RegExp(INTERVAL_TAG + '\\s*(\\d+)'),
        );

        if (match) {
          const intervalIndex = match[1];
          selectInterval(Number(intervalIndex));
        }
      });
    }
  };

  return {
    render,
  };
}
