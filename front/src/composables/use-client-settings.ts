import {PLOT_BACKGROUND} from 'src/constants';
import {ref} from 'vue';

const isDetailsAutoOpen = ref<boolean>(false);
const plotBackground = ref<PLOT_BACKGROUND>(PLOT_BACKGROUND.transparent);
const isPreview = ref<boolean>(false);
const isTimezoneActive = ref<boolean>(false);
const timeShift = ref<number>(0); // hours
const isCopyOnSelect2d = ref<boolean>(true);
const isWebGlScatter2d = ref<boolean>(true);
const isColorMapSwapped = ref<boolean>(false);

export function useClientSettings() {
  return {
    isDetailsAutoOpen: isDetailsAutoOpen,
    plotBackground: plotBackground,
    isPreview: isPreview,
    isTimezoneActive: isTimezoneActive,
    timeShift: timeShift,
    isCopyOnSelect2d: isCopyOnSelect2d,
    isWebGlScatter2d: isWebGlScatter2d,
    isColorMapSwapped: isColorMapSwapped,
  };
}
