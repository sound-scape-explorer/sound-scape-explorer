import Plotly, {type ModeBarButtonAny} from 'plotly.js-dist-min';
import {addPlotlyActualSize} from 'src/utils/add-plotly-actual-size';

import {type PlotlyExportOptionsWithoutSize} from './create-plotly-export-svg-button';

export function createPlotlyExportPngButtonDigested(
  options: PlotlyExportOptionsWithoutSize,
): ModeBarButtonAny {
  return {
    name: 'download-png',
    title: 'Download as PNG',
    icon: Plotly.Icons.camera,
    click: async (gd) => {
      const optionsWithSize = addPlotlyActualSize(options, gd);
      await Plotly.downloadImage(gd, {...optionsWithSize, format: 'png'});
    },
  };
}
