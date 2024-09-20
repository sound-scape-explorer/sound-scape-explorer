import {type Layout} from 'plotly.js-dist-min';
import {type AppCandlesProps} from 'src/app/candles/app-candles.vue';
import {useClientSettings} from 'src/composables/use-client-settings';

export function useAppCandlesLayout() {
  const {plotBackground} = useClientSettings();

  const generateLayout = (
    props: AppCandlesProps,
    padding = 70,
  ): Partial<Layout> => {
    return {
      plot_bgcolor: plotBackground.value,
      paper_bgcolor: plotBackground.value,
      showlegend: false,
      height: 400,
      title: props?.title ?? '',
      margin: {
        l: padding,
        r: padding,
        b: padding * 2,
        t: padding,
        pad: 1,
      },
      xaxis: {
        type: props.condensed ? 'category' : undefined,
        rangeslider: {
          visible: false,
        },
      },
      yaxis: {
        title: props.yTitle ?? '',
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
