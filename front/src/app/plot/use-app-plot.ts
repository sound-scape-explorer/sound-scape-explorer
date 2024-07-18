import type {Config, Data, Layout, PlotlyHTMLElement} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import type {AppPlotProps} from 'src/app/plot/app-plot.vue';
import {useClientSettings} from 'src/composables/use-client-settings';
import {usePlotConfig} from 'src/composables/use-plot-config';
import {useAudioSelector} from 'src/draggables/audio/use-audio-selector';
import {colors} from 'src/styles/colors';
import {ref, watch} from 'vue';

// todo: refactor me
export function useAppPlot(props: AppPlotProps) {
  const container = ref<HTMLDivElement | null>(null);
  const dataRef = ref<Data[] | null>(null);
  const layoutRef = ref<Partial<Layout> | null>(null);
  const configRef = ref<Partial<Config> | null>(null);
  const plot = ref<PlotlyHTMLElement | null>(null);
  const {generateConfig} = usePlotConfig(props.exportFilename);
  const {plotBackground} = useClientSettings();
  const {selectAudio} = useAudioSelector();

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

    if (props?.clickEnabled) {
      plot.value.on('plotly_click', (e) => {
        const plotIndex = e.points[0].pointIndex;
        // @ts-expect-error: missing typescript definition
        const legendString: string = e.points[0].fullData.x[plotIndex];
        const intervalIndex = legendString.split('<br>Interval: ')[1];
        selectAudio(Number(intervalIndex));
      });
    }
  }

  function refresh() {
    let data: Data[] = [];

    for (const index in props.values) {
      const d: Data = {
        type: 'scatter',
        mode: 'lines',
        name: props.names?.[index] ?? undefined,
        x: props.labels[index],
        y: props.values[index],
        hovertemplate: '%{y:.3f}<extra>%{x}</extra>',
        marker: {
          // color: props.colors?.[index] ?? undefined,
          color: colors.green,
          size: props.colors?.[index] ? 6 : 2,
        },
      };

      data = [...data, d];
    }

    dataRef.value = data;

    const p = 70;
    const layout: Partial<Layout> = {
      title: props.title,
      plot_bgcolor: plotBackground.value,
      paper_bgcolor: plotBackground.value,
      showlegend: !!props.legend,
      clickmode: 'event',
      height: 400,
      margin: {
        l: p,
        r: p,
        b: props.hideXLegend ? p : p * 2,
        t: p,
        pad: 1,
      },
      xaxis: {
        title: props.xTitle,
        showticklabels: !props.hideXLegend,
        rangeslider: {
          visible: true,
        },
      },
      yaxis: {
        title: props.yTitle,
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
