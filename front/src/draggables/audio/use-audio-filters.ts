import {useClientSettings} from 'src/composables/use-client-settings';
import {useNyquist} from 'src/composables/use-nyquist';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';
import {z} from 'zod';

export const FilterType = z.enum(['hpf', 'lpf']);
// eslint-disable-next-line no-redeclare
export type FilterType = z.infer<typeof FilterType>;

const hpfChain = ref<BiquadFilterNode[]>([]);
const lpfChain = ref<BiquadFilterNode[]>([]);

const hpfReadable = ref<number | null>(null);
const lpfReadable = ref<number | null>(null);

export function useAudioFilters() {
  const {band} = useViewSelection();
  const {nyquist} = useNyquist();
  const {audioFilterSlope} = useClientSettings();

  const getOrder = () => {
    return Number(audioFilterSlope.value) / 12;
  };

  const createFilter = (
    type: FilterType,
    frequency: number,
    context: AudioContext,
    destination: AudioNode,
  ) => {
    const chain: BiquadFilterNode[] = [];
    const order = getOrder();

    // create individual filters
    for (let i = 0; i < order; i += 1) {
      const filter = context.createBiquadFilter();
      filter.type = type === FilterType.enum.hpf ? 'highpass' : 'lowpass';
      filter.Q.value = 1;
      filter.frequency.value = frequency;
      chain.push(filter);
    }

    // connect filters
    for (let i = 0; i < chain.length - 1; i++) {
      chain[i].connect(chain[i + 1]);
    }
    chain[chain.length - 1].connect(destination);

    return chain;
  };

  const update = (type: FilterType, value: number | null) => {
    if (
      value === null ||
      hpfChain.value.length === 0 ||
      lpfChain.value.length === 0
    ) {
      return;
    }

    if (
      type === FilterType.enum.hpf &&
      value !== hpfChain.value[0].frequency.value
    ) {
      const v = value > nyquist.value ? nyquist.value : value;

      for (const filter of hpfChain.value) {
        filter.frequency.value = v;
      }

      if (v !== hpfReadable.value) {
        hpfReadable.value = v;
      }
    }

    if (
      type === FilterType.enum.lpf &&
      value !== lpfChain.value[0].frequency.value
    ) {
      const v = value > nyquist.value ? nyquist.value : value;

      for (const filter of lpfChain.value) {
        filter.frequency.value = v;
      }

      if (v !== lpfReadable.value) {
        lpfReadable.value = v;
      }
    }
  };

  const reset = (type: FilterType) => {
    if (
      band.value === null ||
      hpfChain.value.length === 0 ||
      lpfChain.value.length === 0
    ) {
      return;
    }

    if (type === FilterType.enum.hpf) {
      hpfReadable.value = band.value.low;

      for (const filter of hpfChain.value) {
        filter.frequency.value = band.value.low;
      }
    }

    if (type === FilterType.enum.lpf) {
      lpfReadable.value = band.value.high;

      for (const filter of lpfChain.value) {
        filter.frequency.value = band.value.high;
      }
    }
  };

  const resetAll = () => {
    reset(FilterType.enum.hpf);
    reset(FilterType.enum.lpf);
  };

  return {
    hpfChain,
    lpfChain,
    hpfReadable,
    lpfReadable,
    createFilter,
    update,
    reset,
    resetAll,
  };
}
