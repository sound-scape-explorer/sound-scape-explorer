import {type Layout} from 'plotly.js-dist-min';
import {settingsStore} from 'src/draggables/settings/settings-store';
import {reactive} from 'vue';

import {heatmapHeightRef, heatmapWidthRef} from './useHeatmapSize';

interface PlotlyFontSizeRef {
  value: string;
}

export const plotlyFontSizeRef = reactive<PlotlyFontSizeRef>({
  value: '12',
});

export function useHeatmapLayout() {
  const generateLayout = (title: string): Partial<Layout> => {
    const layout: Partial<Layout> = {
      title: title,
      paper_bgcolor: settingsStore.plotBackground,
      plot_bgcolor: settingsStore.plotBackground,
      clickmode: 'none',
      showlegend: false,
      // TODO: Make height and width dynamic, changeable by the user
      width: heatmapWidthRef.value,
      height: heatmapHeightRef.value,
      font: {
        size: Number(plotlyFontSizeRef.value),
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
    generateLayout: generateLayout,
  };
}
