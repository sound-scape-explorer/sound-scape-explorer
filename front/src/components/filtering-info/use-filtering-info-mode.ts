import {useIntervalTransport} from 'src/composables/use-interval-transport';
import {computed, ref} from 'vue';
import {z} from 'zod';

const Mode = z.enum(['collected', 'filtered', 'interval']);
// eslint-disable-next-line no-redeclare
type Mode = z.infer<typeof Mode>;

const mode = ref<Mode>(Mode.enum.collected);

export function useFilteringInfoMode() {
  const {hasInterval} = useIntervalTransport();
  const isIntervalMode = computed(() => mode.value === Mode.enum.interval);
  const isCollectMode = computed(() => mode.value === Mode.enum.collected);
  const isFilterMode = computed(() => mode.value === Mode.enum.filtered);

  const cycleMode = () => {
    let m = Mode.options.indexOf(mode.value);
    m += 1;

    if (m >= Mode.options.length) {
      m = 0;
    }

    let newMode: Mode = Mode.options[m];

    const isIntervalNotYetClicked =
      newMode === Mode.enum.interval && !hasInterval.value;

    if (isIntervalNotYetClicked) {
      newMode = Mode.enum.collected;
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
