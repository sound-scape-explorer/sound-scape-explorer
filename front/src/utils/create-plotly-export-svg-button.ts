import Plotly, {
  type DownloadImgopts,
  type ModeBarButtonAny,
  type PlotlyHTMLElement,
} from 'plotly.js-dist-min';

export interface PlotlyExportOptions extends Omit<DownloadImgopts, 'format'> {
  scale?: number;
}

export function createPlotlyExportSvgButton(
  options: PlotlyExportOptions,
): ModeBarButtonAny {
  return {
    name: 'download-svg',
    title: 'Download as SVG',
    icon: Plotly.Icons['camera-retro'],
    click: async (gd: PlotlyHTMLElement) => {
      await Plotly.downloadImage(gd, {...options, format: 'svg'});
    },
  };
}
