import {formatTimestampToString} from '@shared/dates';
import {type AppCandlesProps} from 'src/app/candles/app-candles.vue';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {
  type TemporalData,
  useTemporalData,
} from 'src/draggables/temporal/use-temporal-data';
import {useTemporalHloc} from 'src/draggables/temporal/use-temporal-hloc';
import {useTemporalStrategy} from 'src/draggables/temporal/use-temporal-strategy';
import {ref} from 'vue';

export const INTERVAL_TAG = '<b>Interval:</b>';

type OmitKeys = 'title' | 'exportFilename' | 'condensed';

export type CandlesData = Omit<AppCandlesProps, OmitKeys>;
export type PlotData = Omit<AppPlotProps, OmitKeys>;

const plot = ref<PlotData | null>(null);
const candles = ref<CandlesData | null>(null);

export function useTemporalChart() {
  const {isCandles} = useDraggableTemporal();
  const {data} = useTemporalData();
  const {filtered} = useScatterGlobalFilter();
  const {calculate} = useTemporalHloc();
  const {apply} = useTemporalStrategy();

  const filterActualData = () => {
    const filteredData: TemporalData[] = [];

    for (let i = 0; i < data.value.length; i += 1) {
      if (filtered.value[i]) {
        continue;
      }

      filteredData.push(data.value[i]);
    }

    return filteredData;
  };

  const render = () =>
    requestAnimationFrame(() => {
      if (data.value.length === 0) {
        candles.value = generateCandlesSkeleton();
        return;
      }

      if (isCandles.value) {
        candles.value = generateCandlesPlot();
        return;
      }

      plot.value = generateContinuousPlot();
    });

  const generateContinuousPlot = (): PlotData => {
    const filteredData = filterActualData();

    return {
      labels: [
        filteredData.map(
          (d) =>
            `<b>Date:</b> ${formatTimestampToString(d.timestamp)}<br>${INTERVAL_TAG} ${d.index}<br><b>Site:</b> ${d.siteName}`,
        ),
      ],
      values: [filteredData.map((d) => apply(d.values))],
      colors: ['green'],
    };
  };

  const generateCandlesSkeleton = (): CandlesData => {
    return {
      timestamps: [],
      labels: [],
      high: [],
      low: [],
      open: [],
      close: [],
    };
  };

  const generateCandlesPlot = (): CandlesData => {
    const filteredData = filterActualData();
    const values = filteredData.map((d) => apply(d.values));
    const timestamps = filteredData.map((d) => d.timestamp);

    const hloc = calculate(values, timestamps);

    return {
      labels: [],
      timestamps: hloc.map((x) => x.timestamp),
      high: hloc.map((x) => x.high),
      low: hloc.map((x) => x.low),
      open: hloc.map((x) => x.open),
      close: hloc.map((x) => x.close),
    };
  };

  return {
    candles,
    plot,
    render,
  };
}
