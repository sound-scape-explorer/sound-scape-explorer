import {type Layout} from 'plotly.js-dist-min';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import {useClientSettings} from 'src/composables/use-client-settings';

export function useAppHeatmapLayout() {
  const {width, height, fontSize} = useAppHeatmapSize();
  const {plotBackground, isPlotAutoMargin} = useClientSettings();

  const createLayout = (title: string): Partial<Layout> => {
    // noinspection SpellCheckingInspection
    const layout: Partial<Layout> = {
      title: title,
      paper_bgcolor: plotBackground.value,
      plot_bgcolor: plotBackground.value,
      clickmode: 'none',
      showlegend: false,
      width: width.value,
      height: height.value,
      font: {
        size: fontSize.value,
      },
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
        automargin: isPlotAutoMargin.value,
      },
      yaxis: {
        zeroline: false,
        showgrid: false,
        fixedrange: true,
        autorange: 'reversed',
        ticks: '',
        type: 'category',
        tickmode: 'linear',
        automargin: isPlotAutoMargin.value,
      },
    };
    return layout;
  };

  return {
    createLayout: createLayout,
  };
}
