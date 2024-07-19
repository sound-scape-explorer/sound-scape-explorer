import type {AppCandlesProps} from 'src/app/candles/app-candles.vue';
import type {AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useDate} from 'src/composables/use-date';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useSites} from 'src/composables/use-sites';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporal} from 'src/draggables/temporal/use-temporal';
import {useTemporalHloc} from 'src/draggables/temporal/use-temporal-hloc';
import {ref} from 'vue';

type OmitKeys = 'title' | 'exportFilename' | 'condensed';

export type CandlesData = Omit<AppCandlesProps, OmitKeys>;
export type PlotData = Omit<AppPlotProps, OmitKeys>;

const plot = ref<PlotData | null>(null);
const candles = ref<CandlesData | null>(null);

export function useTemporalChart() {
  const {isCandles, isScatter} = useDraggableTemporal();
  const {sites} = useSites();
  const {data} = useTemporal();
  const {scale: cyclingScale} = useColorsCycling();
  const {convertTimestampToIsoDate} = useDate();
  const {filtered} = useScatterGlobalFilter();
  const {calculate} = useTemporalHloc();

  const prepare = () => {
    let values: number[] = [];
    let timestamps: number[] = [];
    let siteValues: string[] = [];

    for (let i = 0; i < data.value.length; i += 1) {
      if (isScatter.value && filtered.value[i]) {
        continue;
      }

      const d = data.value[i];
      values = [...values, d.values[0]];
      timestamps = [...timestamps, d.timestamp];
      siteValues = [...siteValues, d.site];
    }

    return {
      values: values,
      timestamps: timestamps,
      siteValues: siteValues,
    };
  };

  const getColors = (siteNames: string[]) => {
    const colors = cyclingScale.value.colors(siteNames.length + 1);
    const strings = data.value.map((d) => colors[siteNames.indexOf(d.site)]);

    return strings;
  };

  const render = () => {
    if (sites.value === null || data.value.length === 0) {
      candles.value = generateHolder();
      return;
    }

    const {values, timestamps, siteValues} = prepare();
    const siteNames = sites.value.map((site) => site.name);
    const colors = getColors(siteNames);

    if (!isCandles.value) {
      plot.value = generateContinuous(values, timestamps, siteValues, colors);
    }

    candles.value = generateFlat(values, timestamps, siteValues, colors);
  };

  const generateHolder = (): CandlesData => {
    return {
      timestamps: [],
      labels: [],
      high: [],
      low: [],
      open: [],
      close: [],
      // colors: [],
    };
  };

  const generateFlat = (
    values: number[],
    timestamps: number[],
    siteValues: string[],
    colors: string[],
  ): CandlesData => {
    const hloc = calculate(values, timestamps);

    return {
      labels: timestamps.map(
        (t, i) =>
          `${convertTimestampToIsoDate(t)}<br>Site: ${
            siteValues[i]
          }<br>Interval: ${i}`,
      ),
      timestamps: hloc.map((x) => x.timestamp),
      high: hloc.map((x) => x.high),
      low: hloc.map((x) => x.low),
      open: hloc.map((x) => x.open),
      close: hloc.map((x) => x.close),
      // colors: [colors],
    };
  };

  const generateContinuous = (
    values: number[],
    timestamps: number[],
    siteValues: string[],
    colors: string[],
  ): PlotData => {
    const indices = Array.from({length: timestamps.length}, (_, i) => i);
    indices.sort((a, b) => timestamps[a] - timestamps[b]);

    return {
      labels: [
        indices.map(
          (i) =>
            `${convertTimestampToIsoDate(timestamps[i])}<br>Site: ${
              siteValues[i]
            }<br>Interval: ${i}`,
        ),
      ],
      values: [indices.map((i) => values[i])],
      colors: [indices.map((i) => colors[i])],
    };
  };

  return {
    candles: candles,
    plot: plot,
    render: render,
  };
}
