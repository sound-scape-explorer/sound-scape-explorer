import type {Data, Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {ref, watch} from 'vue';

export interface HistogramProps {
  labels: string[];
  values: number[];
  title: string;
}

export function useAppHistogram(props: HistogramProps) {
  const divRef = ref<HTMLDivElement>();
  const dataRef = ref<Data[]>();
  const layoutRef = ref<Partial<Layout>>();

  async function render() {
    const div = divRef.value;
    const data = dataRef.value;
    const layout = layoutRef.value;

    if (
      typeof div === 'undefined' ||
      typeof data === 'undefined' ||
      typeof layout === 'undefined'
    ) {
      return;
    }

    await Plotly.newPlot(div, data, layout, {displaylogo: false});
  }

  function refresh() {
    dataRef.value = [
      {
        type: 'bar',
        x: props.labels,
        y: props.values,
        hovertemplate: '%{y:.3f}<extra>%{x}</extra>',
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
