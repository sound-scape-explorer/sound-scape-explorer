import {type Layout} from 'plotly.js-dist-min';
import {useAppHeatmapSize} from 'src/app/heatmap/app-heatmap-size';
import {settingsStore} from 'src/draggables/settings/settings-store';

export function useAppHeatmapLayout() {
  const {width, height, fontSize} = useAppHeatmapSize();

  const createLayout = (title: string): Partial<Layout> => {
    // noinspection SpellCheckingInspection
    const layout: Partial<Layout> = {
      title: title,
      paper_bgcolor: settingsStore.plotBackground,
      plot_bgcolor: settingsStore.plotBackground,
      clickmode: 'none',
      showlegend: false,
      width: width.value,
      height: height.value,
      font: {
        size: Number(fontSize.value),
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
    createLayout: createLayout,
  };
}
