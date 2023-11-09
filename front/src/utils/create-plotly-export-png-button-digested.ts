import {type ModeBarButtonAny} from 'plotly.js-dist-min';
import Plotly from 'plotly.js-dist-min';

import type {PlotlyExportOptions} from './create-plotly-export-svg-button';

export function createPlotlyExportPngButtonDigested(
  options: PlotlyExportOptions,
): ModeBarButtonAny {
  options.format = 'png';

  return {
    name: 'download-png',
    title: 'Download as PNG',
    icon: Plotly.Icons.camera,
    click: async (gd) => {
      options.format = 'png';
      await Plotly.downloadImage(gd, options);
    },
  };
}
