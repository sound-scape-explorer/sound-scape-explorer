import {type Layout} from 'plotly.js-dist-min';

export function useHeatmapLayout() {
  const generateLayout = (title: string): Partial<Layout> => {
    const layout: Partial<Layout> = {
      title: title,
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      clickmode: 'none',
      showlegend: false,
      width: 600,
      height: 600,
      margin: {
        l: 100,
        r: 100,
        b: 100,
        t: 100,
        pad: 1,
      },
      xaxis: {
        zeroline: false,
        showgrid: false,
        fixedrange: true,
        ticks: '',
        type: 'category',
        tickmode: 'linear',
      },
      yaxis: {
        zeroline: false,
        showgrid: false,
        fixedrange: true,
        autorange: 'reversed',
        ticks: '',
        type: 'category',
        tickmode: 'linear',
      },
    };
    return layout;
  };

  return {
    generateLayout: generateLayout,
  };
}
