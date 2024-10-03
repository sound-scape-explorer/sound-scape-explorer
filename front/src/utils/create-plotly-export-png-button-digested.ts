import Plotly, {type ModeBarButtonAny} from 'plotly.js-dist-min';

import {type PlotlyExportOptions} from './create-plotly-export-svg-button';

export function createPlotlyExportPngButtonDigested(
  options: PlotlyExportOptions,
): ModeBarButtonAny {
  return {
    name: 'download-png',
    title: 'Download as PNG',
    icon: Plotly.Icons.camera,
    click: async (gd) => {
      await Plotly.downloadImage(gd, {...options, format: 'png'});
    },
  };
}
