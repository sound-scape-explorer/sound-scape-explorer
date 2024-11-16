import {type AppPlotProps, type AppPlotRefs} from 'src/app/plot/app-plot.vue';
import {useAppPlotData} from 'src/app/plot/use-app-plot-data';
import {useAppPlotLayout} from 'src/app/plot/use-app-plot-layout';
import {useAppPlotRenderer} from 'src/app/plot/use-app-plot-renderer';
import {useBasePlotConfig} from 'src/composables/use-base-plot-config';
import {useClientSettings} from 'src/composables/use-client-settings';
import {onMounted, watch} from 'vue';

export function useAppPlotLifecycles(props: AppPlotProps, refs: AppPlotRefs) {
  const {generateConfig} = useBasePlotConfig();
  const {generateLayout} = useAppPlotLayout();
  const {plotBackground} = useClientSettings();
  const {generateData} = useAppPlotData(props);
  const {render} = useAppPlotRenderer(props, refs);

  const refresh = () => {
    refs.data.value = generateData();
    refs.layout.value = generateLayout(props);
    refs.config.value = generateConfig(props.exportFilename);
  };

  onMounted(refresh);
  watch([refs.container, refs.data, refs.layout], render);
  watch([props, plotBackground], refresh);
}