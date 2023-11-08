import {type Config} from 'plotly.js-dist-min';
import {digestedRef} from 'src/components/Digested/useDigested';
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
      modeBarButtonsToAdd: [createPlotlyExportSvgButton(optionsRef.value)],
      modeBarButtonsToRemove: ['toImage'],
    };

    return config;
  };

  return {
    generateConfig: generateConfig,
  };
}
