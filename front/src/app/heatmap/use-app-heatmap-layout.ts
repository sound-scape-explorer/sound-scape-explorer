import {type Layout} from 'plotly.js-dist-min';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import {useClientSettings} from 'src/composables/use-client-settings';
import {usePlotlyMargins} from 'src/composables/use-plotly-margins';

export function useAppHeatmapLayout() {
  const {width, height, fontSize} = useAppHeatmapSize();
  const {plotBackground} = useClientSettings();
  const {generatePlotlyMargins} = usePlotlyMargins();

  const createLayout = (title?: string): Partial<Layout> => {
    const layout: Partial<Layout> = {
      title: title,
      paper_bgcolor: plotBackground.value,
      plot_bgcolor: plotBackground.value,
      clickmode: 'none',
      showlegend: false,
      width: width.value,
      height: height.value,
      margin: generatePlotlyMargins(),
      font: {
        size: fontSize.value,
      },
      xaxis: {
        zeroline: false,
        showgrid: false,
        fixedrange: true,
        ticks: '',
        type: 'category',
        tickmode: 'linear',
        automargin: true,
      },
      yaxis: {
        zeroline: false,
        showgrid: false,
        fixedrange: true,
        autorange: 'reversed',
        ticks: '',
        type: 'category',
        tickmode: 'linear',
        automargin: true,
      },
    };
    return layout;
  };

  return {
    createLayout: createLayout,
  };
}
