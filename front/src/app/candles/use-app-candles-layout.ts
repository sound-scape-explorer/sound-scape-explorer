import {type Layout} from 'plotly.js-dist-min';
import {type AppCandlesProps} from 'src/app/candles/app-candles.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {usePlotlyMargins} from 'src/composables/use-plotly-margins';

export function useAppCandlesLayout() {
  const {plotBackground, plotFontSize} = useClientSettings();
  const {generatePlotlyMargins} = usePlotlyMargins();

  const generateLayout = (props: AppCandlesProps): Partial<Layout> => {
    return {
      plot_bgcolor: plotBackground.value,
      paper_bgcolor: plotBackground.value,
      showlegend: false,
      title: props.title,
      font: {
        size: plotFontSize.value,
      },
      margin: generatePlotlyMargins(),
      xaxis: {
        type: props.condensed ? 'category' : undefined,
        rangeslider: {
          visible: false,
        },
        automargin: true,
      },
      yaxis: {
        title: props.yTitle ?? '',
        automargin: true,
      },
    };
  };

  return {
    generateLayout,
  };
}
