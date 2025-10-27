import {type AppCandlesProps} from 'src/app/candles/app-candles.vue';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useColorsCycling} from 'src/composables/use-colors-cycling';
import {useDate} from 'src/composables/use-date';
import {useScatterGlobalFilter} from 'src/composables/use-scatter-global-filter';
import {useDraggableTemporal} from 'src/draggables/temporal/use-draggable-temporal';
import {useTemporalData} from 'src/draggables/temporal/use-temporal-data';
import {useTemporalHloc} from 'src/draggables/temporal/use-temporal-hloc';
import {useTemporalStrategy} from 'src/draggables/temporal/use-temporal-strategy';
import {getSortedIndices} from 'src/utils/utils';
import {ref} from 'vue';

type OmitKeys = 'title' | 'exportFilename' | 'condensed';

export type CandlesData = Omit<AppCandlesProps, OmitKeys>;
export type PlotData = Omit<AppPlotProps, OmitKeys>;

const plot = ref<PlotData | null>(null);
const candles = ref<CandlesData | null>(null);

export function useTemporalChart() {
  const {isCandles} = useDraggableTemporal();
  const {data} = useTemporalData();
  const {scale: cyclingScale} = useColorsCycling();
  const {convertTimestampToIsoDate} = useDate();
  const {filtered} = useScatterGlobalFilter();
  const {calculate} = useTemporalHloc();
  const {apply} = useTemporalStrategy();

  const prepare = () => {
    let values: number[] = [];
    let timestamps: number[] = [];
    let siteNames: string[] = [];

    for (let i = 0; i < data.value.length; i += 1) {
      if (filtered.value[i]) {
        continue;
      }

      const d = data.value[i];

      // info: typing mislead as data can be empty at unselected site indices
      if (typeof d === 'undefined') {
        continue;
      }

      const result = apply(d.values);
      values = [...values, result];
      timestamps = [...timestamps, d.timestamp];
      siteNames = [...siteNames, d.siteName];
    }

    return {
      values,
      timestamps,
      siteNames,
    };
  };

  const getColors = (siteNames: string[]) => {
    const colors = cyclingScale.value.colors(siteNames.length + 1);
    const strings = data.value.map(
      (d) => colors[siteNames.indexOf(d.siteName)],
    );

    return strings;
  };

  const render = () =>
    requestAnimationFrame(() => {
      if (data.value.length === 0) {
        candles.value = generateSkeleton();
        return;
      }

      const {values, timestamps, siteNames} = prepare();

      if (isCandles.value) {
        candles.value = generateCandles(values, timestamps, siteNames);
        return;
      }

      const colors = getColors(siteNames);
      plot.value = generateContinuous(values, timestamps, colors);
    });

  const generateSkeleton = (): CandlesData => {
    return {
      timestamps: [],
      labels: [],
      high: [],
      low: [],
      open: [],
      close: [],
    };
  };

  const generateLabels = (timestamps: number[], sites: string[]) => {
    return timestamps.map(
      (t, i) =>
        `${convertTimestampToIsoDate(t)}<br>Site: ${
          sites[i]
        }<br>Interval: ${i}`,
    );
  };

  const generateCandles = (
    values: number[],
    timestamps: number[],
    siteNames: string[],
  ): CandlesData => {
    const hloc = calculate(values, timestamps);

    return {
      labels: generateLabels(timestamps, siteNames),
      timestamps: hloc.map((x) => x.timestamp),
      high: hloc.map((x) => x.high),
      low: hloc.map((x) => x.low),
      open: hloc.map((x) => x.open),
      close: hloc.map((x) => x.close),
    };
  };

  const generateLabelsContinuous = (
    indices: number[],
    timestamps: number[],
  ): string[][] => {
    return [
      indices.map(
        (i) => `${convertTimestampToIsoDate(timestamps[i])} Interval: ${i}`,
      ),
    ];
  };

  const generateContinuous = (
    values: number[],
    timestamps: number[],
    colors: string[],
  ): PlotData => {
    const indices = getSortedIndices(timestamps);
    const labels = generateLabelsContinuous(indices, timestamps);

    return {
      labels,
      values: [values],
      colors,
    };
  };

  return {
    candles,
    plot,
    render,
  };
}
