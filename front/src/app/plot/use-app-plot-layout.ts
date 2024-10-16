import {type Layout} from 'plotly.js-dist-min';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {usePlotlyMargins} from 'src/composables/use-plotly-margins';

export function useAppPlotLayout() {
  const {plotBackground} = useClientSettings();
  const {generatePlotlyMargins} = usePlotlyMargins();

  const generateLayout = (props: AppPlotProps): Partial<Layout> => {
    return {
      title: props.title,
      plot_bgcolor: plotBackground.value,
      paper_bgcolor: plotBackground.value,
      showlegend: !!props.legend,
      clickmode: 'event',
      margin: generatePlotlyMargins(),
      xaxis: {
        title: props.xTitle,
        showticklabels: !props.hideXLegend,
        rangeslider: {
          visible: props.showRange,
        },
      },
      yaxis: {
        title: props.yTitle,
      },
      legend: {
        xanchor: 'right',
        yanchor: 'top',
        x: 1,
        y: 1,
      },
    };
  };

  return {
    generateLayout: generateLayout,
  };
}
