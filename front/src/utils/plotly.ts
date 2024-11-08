import Plotly, {
  type DownloadImgopts,
  type ModeBarButtonAny,
  type PlotlyHTMLElement,
} from 'plotly.js-dist-min';

export interface PlotlyExportOptions extends Omit<DownloadImgopts, 'format'> {
  scale?: number;
}

export type PlotlyExportOptionsWithoutSize = Omit<
  PlotlyExportOptions,
  'width' | 'height'
>;

export function addPlotlyActualSize(
  options: PlotlyExportOptionsWithoutSize,
  gd: PlotlyHTMLElement,
): PlotlyExportOptions {
  return {
    ...options,
    width: gd.scrollWidth,
    height: gd.scrollHeight,
  };
}

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
