import {type Config} from 'plotly.js-dist-min';
import {digestedRef} from 'src/components/Digested/useDigested';
import {createPlotlyExportPngButtonDigested} from 'src/utils/create-plotly-export-png-button-digested';
import {
  createPlotlyExportSvgButton,
  type PlotlyExportOptions,
} from 'src/utils/create-plotly-export-svg-button';
import {computed} from 'vue';

import {heatmapHeightRef, heatmapWidthRef} from './useHeatmapSize';

export function useHeatmapConfig() {
  const scale = 4;

  const exportNameRef = computed<string>(
    () => `SSE-${digestedRef.value?.digester.name}`,
  );

  const optionsRef = computed<PlotlyExportOptions>(() => ({
    filename: exportNameRef.value,
    width: heatmapWidthRef.value,
    height: heatmapHeightRef.value,
    format: 'svg',
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
