import {type Config} from 'plotly.js-dist-min';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import {createPlotlyExportPngButtonDigested} from 'src/utils/create-plotly-export-png-button-digested';
import {
  createPlotlyExportSvgButton,
  type PlotlyExportOptions,
} from 'src/utils/create-plotly-export-svg-button';

const scale = 4;

export function useBasePlotConfig() {
  const {width, height} = useAppHeatmapSize();

  const generateConfig = (name: string): Partial<Config> => {
    const options: PlotlyExportOptions = {
      filename: name,
      width: width.value,
      height: height.value,
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
