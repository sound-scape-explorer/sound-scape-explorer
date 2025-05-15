import {
  barChartOutline,
  calendarOutline,
  cloudUploadOutline,
  cogOutline,
  colorPaletteOutline,
  cropOutline,
  eyeOutline,
  gridOutline,
  headsetOutline,
  helpOutline,
  layersOutline,
  listOutline,
  navigateOutline,
  statsChartOutline,
  timerOutline,
} from 'ionicons/icons';
import {DraggableKey} from 'src/composables/use-draggables';

type MenuIconByKey = {
  [K in DraggableKey]: string;
};

export function useAppMenu() {
  const menu: MenuIconByKey = {
    open: cloudUploadOutline,
    settings: cogOutline,
    help: helpOutline,
    view: eyeOutline,
    colors: colorPaletteOutline,
    calendar: calendarOutline,
    tags: layersOutline,
    temporal: barChartOutline,
    histograms: statsChartOutline,
    heatmaps: gridOutline,
    details: listOutline,
    audio: headsetOutline,
    trajectories: navigateOutline,
    relativeTrajectories: timerOutline,
    _alphaSelection3d: cropOutline,
  };

  return {
    menu,
  };
}
