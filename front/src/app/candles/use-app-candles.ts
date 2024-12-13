import Plotly, {
  type Config,
  type Data,
  type Layout,
  type PlotlyHTMLElement,
} from 'plotly.js-dist-min';
import {type AppCandlesProps} from 'src/app/candles/app-candles.vue';
import {useAppCandlesLayout} from 'src/app/candles/use-app-candles-layout';
import {useBasePlotConfig} from 'src/composables/use-base-plot-config';
import {useClientSettings} from 'src/composables/use-client-settings';
import {useDate} from 'src/composables/use-date';
import {TIMEOUT} from 'src/constants';
import {ref} from 'vue';

const container = ref<HTMLDivElement | null>(null);
const data = ref<Data[] | null>(null);
const layout = ref<Partial<Layout> | null>(null);
const config = ref<Partial<Config> | null>(null);
const plot = ref<PlotlyHTMLElement | null>(null);

export function useAppCandles(props: AppCandlesProps) {
  const {generateConfig} = useBasePlotConfig();
  const {generateLayout} = useAppCandlesLayout();
  const {plotBackground} = useClientSettings();
  const {convertTimestampToIsoDate} = useDate();

  const mount = () =>
    requestAnimationFrame(async () => {
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
    });

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

  const render = () =>
    requestAnimationFrame(() => {
      setTimeout(() => {
        data.value = generateData();
        layout.value = generateLayout(props);
        config.value = generateConfig(props.exportFilename);
      }, TIMEOUT);
    });

  return {
    container: container,
    data: data,
    layout: layout,
    plotBackground: plotBackground,
    mount: mount,
    render: render,
  };
}
