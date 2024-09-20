import {type Layout} from 'plotly.js-dist-min';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useClientSettings} from 'src/composables/use-client-settings';

export function useAppPlotLayout() {
  const {plotBackground} = useClientSettings();

  const generateLayout = (
    props: AppPlotProps,
    padding = 70,
  ): Partial<Layout> => {
    return {
      title: props.title,
      plot_bgcolor: plotBackground.value,
      paper_bgcolor: plotBackground.value,
      showlegend: !!props.legend,
      clickmode: 'event',
      height: 400,
      margin: {
        l: padding,
        r: padding,
        b: props.hideXLegend ? padding : padding * 2,
        t: padding,
        pad: 1,
      },
      xaxis: {
        title: props.xTitle,
        showticklabels: !props.hideXLegend,
        rangeslider: {
          visible: !props.hideRange,
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
