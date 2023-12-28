import {type Config} from 'plotly.js-dist-min';
import {createPlotlyExportPngButtonDigested} from 'src/utils/create-plotly-export-png-button-digested';
import {
  createPlotlyExportSvgButton,
  type PlotlyExportOptions,
} from 'src/utils/create-plotly-export-svg-button';
import {computed} from 'vue';

import {EXPORT_FILENAME} from '../constants';
import {heatmapHeightRef, heatmapWidthRef} from './useHeatmapSize';

export function useHeatmapConfig(name: string) {
  const scale = 4;

  const exportNameRef = computed<string>(() => `${EXPORT_FILENAME}-${name}`);

  const optionsRef = computed<PlotlyExportOptions>(() => ({
    filename: exportNameRef.value,
    width: heatmapWidthRef.value,
    height: heatmapHeightRef.value,
    scale: scale,
  }));

  const generateConfig = (): Partial<Config> => {
    const config: Partial<Config> = {
      displaylogo: false,
      responsive: true,
      modeBarButtonsToAdd: [
        createPlotlyExportPngButtonDigested(optionsRef.value),
        createPlotlyExportSvgButton(optionsRef.value),
      ],
      modeBarButtonsToRemove: ['toImage'],
    };

    return config;
  };

  return {
    generateConfig: generateConfig,
  };
}
