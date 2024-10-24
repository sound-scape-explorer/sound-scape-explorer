import {type PlotlyHTMLElement} from 'plotly.js-dist-min';
import {
  type PlotlyExportOptions,
  type PlotlyExportOptionsWithoutSize,
} from 'src/utils/create-plotly-export-svg-button';

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
