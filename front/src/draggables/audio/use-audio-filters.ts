import {useConfig} from 'src/composables/use-config';
import {useViewSelection} from 'src/composables/use-view-selection';
import {ref} from 'vue';

const hpf = ref<BiquadFilterNode | null>(null);
const lpf = ref<BiquadFilterNode | null>(null);

const hpfReadable = ref<number | null>(null);
const lpfReadable = ref<number | null>(null);

type BandType = 'hpf' | 'lpf';

export function useAudioFilters() {
  const {band} = useViewSelection();
  const {nyquist} = useConfig();

  const update = (type: BandType, value: number | null) => {
    if (value === null) {
      return;
    }

    if (
      type === 'hpf' &&
      hpf.value !== null &&
      value !== hpf.value.frequency.value
    ) {
      hpf.value.frequency.value = value > nyquist.value ? nyquist.value : value;
    }

    if (
      type === 'lpf' &&
      lpf.value !== null &&
      value !== lpf.value.frequency.value
    ) {
      lpf.value.frequency.value = value > nyquist.value ? nyquist.value : value;
    }
  };

  const reset = (type: BandType) => {
    if (band.value === null) {
      return;
    }

    if (type === 'hpf' && hpf.value !== null) {
      hpf.value.frequency.value = band.value.low;
      hpfReadable.value = band.value.low;
    }

    if (type === 'lpf' && lpf.value !== null) {
      lpf.value.frequency.value = band.value.high;
      lpfReadable.value = band.value.high;
    }
  };

  return {
    hpf,
    lpf,
    hpfReadable,
    lpfReadable,
    update,
    reset,
  };
}
