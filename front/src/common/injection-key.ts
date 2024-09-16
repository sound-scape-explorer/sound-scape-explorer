export type InjectionKey =
  | 'view/reducer'
  | 'view/band'
  | 'view/integration'
  | 'view/extractor'
  | 'settings/audioHost'
  | 'settings/fontSize'
  | 'settings/timeShift'
  | 'settings/colormap'
  | 'settings/plotBackground'
  | 'settings/isDetailsAutoOpen'
  | 'settings/isAudioAutoOpen'
  | 'settings/decibelsDisplay'
  | 'settings/legendOverflow'
  | 'settings/isTimezoneActive'
  | 'settings/isCopyOnSelect2d'
  | 'settings/isWebGlScatter2d'
  | 'settings/isHidingMenuOnDraggableToggle'
  | 'settings/isPreview'
  | 'settings/isDevEnabled'
  | 'settings/devAutoLoadView'
  | 'settings/isSelectedPointHighlighted'
  | 'indicators/list'
  | 'indicators/selection'
  | 'indicators/display'
  | 'indicators/filterFrom'
  | 'indicators/filterTo'
  | 'colors/alphaExcluded'
  | 'colors/alphaIncluded'
  | 'colors/flavor'
  | 'colors/type'
  | 'colors/criteria'
  | 'colors/category'
  | 'colors/indicatorMin'
  | 'colors/indicatorMax'
  | 'colors/labelRangeMin'
  | 'colors/labelRangeMax'
  | 'time/duration'
  | 'digested/digester'
  | 'digested/labelA'
  | 'digested/labelB'
  | 'digested/colorFlavor'
  | 'trajectories/fuse';
