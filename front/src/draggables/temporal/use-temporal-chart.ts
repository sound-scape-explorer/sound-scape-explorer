import {type AppCandlesProps} from 'src/app/candles/app-candles.vue';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {type AcousticSeries} from 'src/composables/use-acoustic-serializer';
import {useDateTime} from 'src/composables/use-date-time';
import {useScatterFilterGlobal} from 'src/composables/use-scatter-filter-global';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalHloc} from 'src/draggables/temporal/use-temporal-hloc';
import {useTemporalSeries} from 'src/draggables/temporal/use-temporal-series';
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
  const {series} = useTemporalSeries();
  const {filtered} = useScatterFilterGlobal();
  const {calculate} = useTemporalHloc();
  const {apply} = useTemporalStrategy();
  const {timestampToString} = useDateTime();

  const filterSeries = () => {
    if (series.value === null) {
      throw new Error('Could not filter temporal series');
    }

    const filteredData: AcousticSeries[] = [];

    for (let i = 0; i < series.value.length; i += 1) {
      if (filtered.value[i]) {
        continue;
      }

      filteredData.push(series.value[i]);
    }

    return filteredData;
  };

  const render = () =>
    requestAnimationFrame(() => {
      if (series.value === null) {
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
    const filteredData = filterSeries();

    // downsample
    const maxTicks = 7;
    const totalLength = filteredData.length;
    const step = Math.floor(totalLength / maxTicks);
    const tickIndices = Array.from(
      {length: Math.ceil(totalLength / step)},
      (_, i) => i * step,
    ).filter((i) => i < totalLength);

    return {
      labels: [
        filteredData.map(
          (d) =>
            `${INTERVAL_TAG} ${d.index}<br><b>Date:</b> ${timestampToString(d.timestamp)}<br><b>Site:</b> ${d.siteName}`,
        ),
      ],
      xTicks: tickIndices.map((i) =>
        timestampToString(filteredData[i].timestamp),
      ),
      xTickIndices: tickIndices.map((i) => `${i}`),
      // xTicks: filteredData.map((d) => timestampToString(d.timestamp)),
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
    const filteredData = filterSeries();
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
