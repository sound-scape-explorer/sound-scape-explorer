import {type AppHeatmapProps} from 'src/app/heatmap/app-heatmap.vue';
import {useAppHeatmap} from 'src/app/heatmap/use-app-heatmap';
import {useAppHeatmapHighlight} from 'src/app/heatmap/use-app-heatmap-highlight';
import {useAppHeatmapRenderer} from 'src/app/heatmap/use-app-heatmap-renderer';
import {useAppHeatmapSize} from 'src/app/heatmap/use-app-heatmap-size';
import {useClientSettings} from 'src/composables/use-client-settings';
import {watch} from 'vue';

export function useAppHeatmapLifecycles(props: AppHeatmapProps) {
  const {div, data, layout} = useAppHeatmap();
  const {create, render} = useAppHeatmapRenderer(props);
  const {width, height} = useAppHeatmapSize();
  const {plotFontSize, plotBackground} = useClientSettings();
  const {highlight} = useAppHeatmapHighlight();

  // on init
  watch([div, data, layout], create);

  // on update
  watch(
    [props, width, height, plotFontSize, plotBackground, highlight],
    render,
  );
}
