import {type AppPlotProps, type AppPlotRefs} from 'src/app/plot/app-plot.vue';
import {useAppPlotData} from 'src/app/plot/use-app-plot-data';
import {useAppPlotLayout} from 'src/app/plot/use-app-plot-layout';
import {useAppPlotRenderer} from 'src/app/plot/use-app-plot-renderer';
import {useBasePlotConfig} from 'src/composables/use-base-plot-config';
import {useClientSettings} from 'src/composables/use-client-settings';
import {TIMEOUT} from 'src/constants';
import {onMounted, watch} from 'vue';

export function useAppPlotLifecycles(props: AppPlotProps, refs: AppPlotRefs) {
  const {generateConfig} = useBasePlotConfig();
  const {generateLayout} = useAppPlotLayout();
  const {plotBackground, plotFontSize} = useClientSettings();
  const {generateData} = useAppPlotData(props);
  const {render} = useAppPlotRenderer(props, refs);

  const refresh = () =>
    requestAnimationFrame(() => {
      setTimeout(() => {
        refs.data.value = generateData();
        refs.layout.value = generateLayout(props);
        refs.config.value = generateConfig(props.exportFilename);
      }, TIMEOUT);
    });

  onMounted(refresh);
  watch([refs.container, refs.data, refs.layout], render);

  watch(
    [
      plotBackground,
      plotFontSize,
      () => props.isExpanded,
      () => props.values,
      () => props.width,
      () => props.height,
    ],
    refresh,
  );
}
