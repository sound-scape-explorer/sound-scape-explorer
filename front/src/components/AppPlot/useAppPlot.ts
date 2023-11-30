import type {Data, Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {PLOTLY_SIZE} from 'src/constants';
import {ref, watch} from 'vue';

import type {AppPlotProps} from './AppPlot.vue';

export function useAppPlot(props: AppPlotProps) {
  const divRef = ref<HTMLDivElement | null>(null);
  const dataRef = ref<Data[] | null>(null);
  const layoutRef = ref<Partial<Layout> | null>(null);

  async function render() {
    if (
      divRef.value === null ||
      dataRef.value === null ||
      layoutRef.value === null
    ) {
      return;
    }

    await Plotly.newPlot(divRef.value, dataRef.value, layoutRef.value, {
      displaylogo: false,
    });
  }

  function refresh() {
    const data: Data[] = [];

    for (const index in props.values) {
      const d: Data = {
        type: 'scatter',
        mode: 'lines+markers',
        name: props.names?.[index] ?? undefined,
        x: props.labels[index],
        y: props.values[index],
        hovertemplate: '%{y:.3f}<extra>%{x}</extra>',
        marker: {
          color: props.colors?.[index] ?? undefined,
          size: props.colors?.[index] ? 6 : 2,
        },
      };

      data.push(d);
    }

    dataRef.value = data;

    layoutRef.value = {
      title: props.title,
      plot_bgcolor: 'transparent',
      paper_bgcolor: 'transparent',
      showlegend: !!props.legend,
      clickmode: 'none',
      width: PLOTLY_SIZE,
      height: PLOTLY_SIZE,
      margin: {
        l: 50,
        r: 50,
        b: 50,
        t: 50,
        pad: 1,
      },
      xaxis: {
        title: props.xTitle,
      },
      yaxis: {
        title: props.yTitle,
      },
      legend: {
        xanchor: 'left',
        yanchor: 'top',
        x: 0,
        y: 1,
      },
    };
  }

  refresh();
  watch([divRef, dataRef, layoutRef], render);

  return {
    divRef: divRef,
    render: render,
    refresh: refresh,
  };
}
