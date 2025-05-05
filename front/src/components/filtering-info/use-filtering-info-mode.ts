import {useIntervalSelector} from 'src/composables/use-interval-selector';
import {computed, ref} from 'vue';

type Mode = 'collected' | 'filtered' | 'interval';

const modes: Mode[] = ['collected', 'filtered', 'interval'];
const mode = ref<Mode>('collected');

export function useFilteringInfoMode() {
  const {hasClicked} = useIntervalSelector();
  const isIntervalMode = computed(() => mode.value === 'interval');
  const isCollectMode = computed(() => mode.value === 'collected');
  const isFilterMode = computed(() => mode.value === 'filtered');

  const cycleMode = () => {
    let m = modes.indexOf(mode.value);
    m += 1;

    if (m >= modes.length) {
      m = 0;
    }

    let newMode: Mode = modes[m];
    const isIntervalNotYetClicked = newMode === 'interval' && !hasClicked.value;
    if (isIntervalNotYetClicked) {
      newMode = 'collected';
    }

    mode.value = newMode;
  };

  return {
    mode,
    cycleMode,
    isIntervalMode,
    isCollectMode,
    isFilterMode,
  };
}
