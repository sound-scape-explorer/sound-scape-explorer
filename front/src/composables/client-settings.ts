import {PLOT_BACKGROUND} from 'src/constants';
import {ref} from 'vue';

const openDetailsOnScatterClick = ref<boolean>(false);
const plotBackground = ref<PLOT_BACKGROUND>(PLOT_BACKGROUND.transparent);
const applyTimezone = ref<boolean>(false);
const preview = ref<boolean>(false);

export function useClientSettings() {
  return {
    openDetailsOnScatterClick: openDetailsOnScatterClick,
    plotBackground: plotBackground,
    applyTimezone: applyTimezone,
    preview: preview,
  };
}
