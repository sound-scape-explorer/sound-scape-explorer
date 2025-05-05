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

interface Menu {
  [key: string]: string;
}

export function useAppMenu() {
  const menu: Menu = {
    open: cloudUploadOutline,
    settings: cogOutline,
    help: helpOutline,
    view: eyeOutline,
    colors: colorPaletteOutline,
    calendar: calendarOutline,
    labels: layersOutline,
    temporal: barChartOutline,
    histograms: statsChartOutline,
    heatmaps: gridOutline,
    details: listOutline,
    audio: headsetOutline,
    selection: cropOutline,
    trajectories: navigateOutline,
    relativeTrajectories: timerOutline,
  };

  return {
    menu,
  };
}
