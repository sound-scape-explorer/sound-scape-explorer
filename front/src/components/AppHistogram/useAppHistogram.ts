import type {Data, Layout} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';
import {PLOTLY_SIZE} from 'src/constants';
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
        type: 'scatter',
        mode: 'lines+markers',
        x: props.labels,
        y: props.values,
        hovertemplate: '%{y:.3f}<extra>%{x}</extra>',
        marker: {
          color: props.colors,
          size: 6,
        },
      },
    ];

    layoutRef.value = {
      title: props.title,
      plot_bgcolor: 'transparent',
      paper_bgcolor: 'transparent',
      showlegend: false,
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
        zeroline: false,
        fixedrange: true,
        showticklabels: false,
      },
      yaxis: {
        zeroline: false,
        fixedrange: true,
        ticks: '',
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
