import type {Data, Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {ref, watch} from 'vue';

export interface HistogramProps {
  labels: string[];
  values: number[];
  colors: string[];
  title?: string;
}

export function useAppHistogram(props: HistogramProps) {
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
    dataRef.value = [
      {
        type: 'bar',
        x: props.labels,
        y: props.values,
        hovertemplate: '%{y:.3f}<extra>%{x}</extra>',
        marker: {
          color: props.colors,
        },
      },
    ];

    layoutRef.value = {
      title: props.title,
      plot_bgcolor: 'transparent',
      paper_bgcolor: 'transparent',
      xaxis: {
        fixedrange: true,
      },
      yaxis: {
        fixedrange: true,
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
