import type {Config, Data, Layout, PlotlyHTMLElement} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import type {AppCandlesProps} from 'src/app/candles/app-candles.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDate} from 'src/composables/use-date';
import {usePlotConfig} from 'src/composables/use-plot-config';
import {ref} from 'vue';

const container = ref<HTMLDivElement | null>(null);
const data = ref<Data[] | null>(null);
const layout = ref<Partial<Layout> | null>(null);
const config = ref<Partial<Config> | null>(null);
const plot = ref<PlotlyHTMLElement | null>(null);

export function useAppCandles(props: AppCandlesProps) {
  const {generateConfig} = usePlotConfig(props.exportFilename);
  const {plotBackground} = useClientSettings();
  const {convertTimestampToIsoDate} = useDate();

  const mount = async () => {
    if (
      container.value === null ||
      data.value === null ||
      layout.value === null ||
      config.value === null
    ) {
      return;
    }

    plot.value = await Plotly.newPlot(
      container.value,
      data.value,
      layout.value,
      config.value,
    );
  };

  const generateData = (): Data[] => {
    const newData: Data = {
      type: 'candlestick',
      x: props.timestamps.map((t) => convertTimestampToIsoDate(t)),
      high: props.high,
      low: props.low,
      open: props.open,
      close: props.close,
      increasing: {line: {color: '#179F5766'}},
      decreasing: {line: {color: '#179F5766'}},
    };

    return [newData];
  };

  const generateLayout = (padding = 70): Partial<Layout> => {
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

  const render = () => {
    data.value = generateData();
    layout.value = generateLayout();
    config.value = generateConfig();
  };

  return {
    container: container,
    data: data,
    layout: layout,
    plotBackground: plotBackground,
    mount: mount,
    render: render,
  };
}
