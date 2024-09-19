import {
  BarChartOutline,
  CalendarOutline,
  CloudUploadOutline,
  CogOutline,
  ColorPaletteOutline,
  CropOutline,
  EyeOutline,
  GridOutline,
  HeadsetOutline,
  HelpOutline,
  LayersOutline,
  ListOutline,
  NavigateOutline,
  ReceiptOutline,
  StatsChartOutline,
  TimerOutline,
} from '@vicons/ionicons5';
import type {Component} from 'vue';

interface Menu {
  [key: string]: Component;
}

// todo: maybe add conditions and text labels to Menu object
export function useAppMenu() {
  const menu: Menu = {
    open: CloudUploadOutline,
    settings: CogOutline,
    help: HelpOutline,
    view: EyeOutline,
    colors: ColorPaletteOutline,
    timeline: ReceiptOutline,
    calendar: CalendarOutline,
    labels: LayersOutline,
    temporal: BarChartOutline,
    histograms: StatsChartOutline,
    heatmaps: GridOutline,
    details: ListOutline,
    audio: HeadsetOutline,
    selection: CropOutline,
    trajectories: NavigateOutline,
    relativeTrajectories: TimerOutline,
  };

  return {
    menu: menu,
  };
}
