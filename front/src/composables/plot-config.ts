import {type Config} from 'plotly.js-dist-min';
import {useAppHeatmapSize} from 'src/app/heatmap/app-heatmap-size';
import {createPlotlyExportPngButtonDigested} from 'src/utils/create-plotly-export-png-button-digested';
import {
  createPlotlyExportSvgButton,
  type PlotlyExportOptions,
} from 'src/utils/create-plotly-export-svg-button';
import {computed} from 'vue';

import {EXPORT_FILENAME} from '../constants';

const scale = 4;

export function usePlotConfig(name: string) {
  const {width, height} = useAppHeatmapSize();
  const exportName = computed<string>(() => `${EXPORT_FILENAME}-${name}`);

  const options = computed<PlotlyExportOptions>(() => ({
    filename: exportName.value,
    width: width.value,
    height: height.value,
    scale: scale,
  }));

  const generateConfig = (): Partial<Config> => {
    const config: Partial<Config> = {
      displaylogo: false,
      responsive: true,
      modeBarButtonsToAdd: [
        createPlotlyExportPngButtonDigested(options.value),
        createPlotlyExportSvgButton(options.value),
      ],
      modeBarButtonsToRemove: ['toImage'],
    };

    return config;
  };

  return {
    generateConfig: generateConfig,
  };
}
