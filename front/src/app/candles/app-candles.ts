import type {Config, Data, Layout, PlotlyHTMLElement} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import type {AppCandlesProps} from 'src/app/candles/app-candles.vue';
import {useClientSettings} from 'src/composables/client-settings';
import {useDate} from 'src/composables/date';
import {usePlotConfig} from 'src/composables/plot-config';
import {ref, watch} from 'vue';

export function useAppCandles(props: AppCandlesProps) {
  const container = ref<HTMLDivElement | null>(null);
  const dataRef = ref<Data[] | null>(null);
  const layoutRef = ref<Partial<Layout> | null>(null);
  const configRef = ref<Partial<Config> | null>(null);
  const plot = ref<PlotlyHTMLElement | null>(null);
  const {generateConfig} = usePlotConfig(props.exportFilename);
  const {plotBackground} = useClientSettings();
  const {convertTimestampToIsoDate} = useDate();

  async function render() {
    if (
      container.value === null ||
      dataRef.value === null ||
      layoutRef.value === null ||
      configRef.value === null
    ) {
      return;
    }

    plot.value = await Plotly.newPlot(
      container.value,
      dataRef.value,
      layoutRef.value,
      configRef.value,
    );
  }

  function refresh() {
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

    dataRef.value = [newData];

    const p = 70;
    const layout: Partial<Layout> = {
      plot_bgcolor: plotBackground.value,
      paper_bgcolor: plotBackground.value,
      showlegend: false,
      height: 400,
      title: props?.title ?? '',
      margin: {
        l: p,
        r: p,
        b: p * 2,
        t: p,
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

    layoutRef.value = layout;

    configRef.value = generateConfig();
  }

  refresh();
  watch([container, dataRef, layoutRef], render);
  watch([props, plotBackground], refresh);

  return {
    container: container,
  };
}
