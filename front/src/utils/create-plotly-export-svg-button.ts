import Plotly, {
  type DownloadImgopts,
  type ModeBarButtonAny,
  type PlotlyHTMLElement,
} from 'plotly.js-dist-min';
import {addPlotlyActualSize} from 'src/utils/add-plotly-actual-size';

export interface PlotlyExportOptions extends Omit<DownloadImgopts, 'format'> {
  scale?: number;
}

export type PlotlyExportOptionsWithoutSize = Omit<
  PlotlyExportOptions,
  'width' | 'height'
>;

export function createPlotlyExportSvgButton(
  options: PlotlyExportOptionsWithoutSize,
): ModeBarButtonAny {
  return {
    name: 'download-svg',
    title: 'Download as SVG',
    icon: Plotly.Icons['camera-retro'],
    click: async (gd: PlotlyHTMLElement) => {
      const optionsWithSize = addPlotlyActualSize(options, gd);
      await Plotly.downloadImage(gd, {...optionsWithSize, format: 'svg'});
    },
  };
}
