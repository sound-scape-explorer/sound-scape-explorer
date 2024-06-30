import {PLOT_BACKGROUND} from 'src/constants';
import {ref} from 'vue';

const openDetailsOnScatterClick = ref<boolean>(false);
const plotBackground = ref<PLOT_BACKGROUND>(PLOT_BACKGROUND.transparent);
const preview = ref<boolean>(false);
const applyTimezone = ref<boolean>(false);
const timeShift = ref<number>(0); // hours
const copySelect2d = ref<boolean>(true);
const scatter2dGl = ref<boolean>(true);

export function useClientSettings() {
  return {
    openDetailsOnScatterClick: openDetailsOnScatterClick,
    plotBackground: plotBackground,
    preview: preview,
    applyTimezone: applyTimezone,
    timeShift: timeShift,
    copySelect2d: copySelect2d,
    scatter2dGl: scatter2dGl,
  };
}
