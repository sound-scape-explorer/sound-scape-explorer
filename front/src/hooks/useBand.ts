import {reactive} from 'vue';

interface BandReactive {
  value: string | null;
}

export const bandRef = reactive<BandReactive>({
  value: null,
});

export function useBand() {
  const setBand = async (band: string) => {
    bandRef.value = band;
  };

  return {
    setBand: setBand,
  };
}
