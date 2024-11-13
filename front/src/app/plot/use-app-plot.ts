import chroma from 'chroma-js';
import Plotly, {
  type Config,
  type Data,
  type Layout,
  type PlotlyHTMLElement,
} from 'plotly.js-dist-min';
import {type AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useAppPlotLayout} from 'src/app/plot/use-app-plot-layout';
import {useBasePlotConfig} from 'src/composables/use-base-plot-config';
import {useClientSettings} from 'src/composables/use-client-settings';
import {LOWER_QUARTILE_SUFFIX, UPPER_QUARTILE_SUFFIX} from 'src/constants';
import {useIntervalSelector} from 'src/draggables/audio/use-interval-selector';
import {type PlotlyFill} from 'src/types';
import {ref, watch} from 'vue';

export function useAppPlot(props: AppPlotProps) {
  const container = ref<HTMLDivElement | null>(null);
  const dataRef = ref<Data[] | null>(null);
  const layoutRef = ref<Partial<Layout> | null>(null);
  const configRef = ref<Partial<Config> | null>(null);
  const plot = ref<PlotlyHTMLElement | null>(null);
  const {generateConfig} = useBasePlotConfig();
  const {generateLayout} = useAppPlotLayout();
  const {plotBackground} = useClientSettings();
  const {selectInterval} = useIntervalSelector();

  const render = async () => {
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

    if (props?.clickEnabled) {
      plot.value.on('plotly_click', (e) => {
        const plotIndex = e.points[0].pointIndex;
        // @ts-expect-error: missing typescript definition
        const legendString: string = e.points[0].fullData.x[plotIndex];
        const intervalIndex = legendString.split('Interval: ')[1];
        selectInterval(Number(intervalIndex));
      });
    }
  };

  const generateData = (): Data[] => {
    const l = props.values.length;
    const data: Data[] = new Array(l);

    for (let i = 0; i < l; i += 1) {
      const name = props.names?.[i] || '';
      const isLowerQuartile = name.endsWith(LOWER_QUARTILE_SUFFIX);
      const isUpperQuartile = name.endsWith(UPPER_QUARTILE_SUFFIX);

      let fill: PlotlyFill = undefined;
      let color: string = props.colors[i];
      let hoverinfo: 'all' | 'none' = 'all';
      let hovertemplate: string | undefined = undefined;
      let showlegend = true;

      if (props.hoverTemplate === 'default') {
        hovertemplate = '%{y:.3f}<extra>%{x}</extra>';
      } else if (props.hoverTemplate === 'relative-trajectories') {
        hovertemplate = `%{y:.3f}<extra>${name}<br>at %{x:.3f}</extra>`;
      }

      if (isLowerQuartile) {
        color = 'transparent';
        hovertemplate = undefined;
        hoverinfo = 'none';
        showlegend = false;
      } else if (isUpperQuartile) {
        color = 'transparent';
        fill = 'tonexty';
        hovertemplate = undefined;
        hoverinfo = 'none';
        showlegend = false;
      }

      data[i] = {
        type: 'scatter',
        mode: 'lines',
        name: name,
        x: props.labels[i],
        y: props.values[i],
        hovertemplate: hovertemplate,
        hoverinfo: hoverinfo,
        fill: fill,
        showlegend: showlegend,
        fillcolor: `rgba(${chroma(props.colors[i])
          .brighten()
          .alpha(0.33)
          .rgba()
          .join(',')})`,
        marker: {
          color: color,
          size: 6,
        },
      };
    }

    return data;
  };

  const refresh = () => {
    dataRef.value = generateData();
    layoutRef.value = generateLayout(props);
    configRef.value = generateConfig(props.exportFilename);
  };

  refresh();
  watch([container, dataRef, layoutRef], render);
  watch([props, plotBackground], refresh);

  return {
    container: container,
  };
}
