import {type Config} from 'plotly.js-dist-min';
import {
  createPlotlyExportPngButtonDigested,
  createPlotlyExportSvgButton,
  type PlotlyExportOptionsWithoutSize,
} from 'src/utils/plotly';

const scale = 4;

export function useBasePlotConfig() {
  const generateConfig = (name: string): Partial<Config> => {
    const options: PlotlyExportOptionsWithoutSize = {
      filename: name,
      scale: scale,
    };

    const config: Partial<Config> = {
      displaylogo: false,
      responsive: true,
      modeBarButtonsToAdd: [
        createPlotlyExportPngButtonDigested(options),
        createPlotlyExportSvgButton(options),
      ],
      modeBarButtonsToRemove: ['toImage'],
    };

    return config;
  };

  return {
    generateConfig: generateConfig,
  };
}
