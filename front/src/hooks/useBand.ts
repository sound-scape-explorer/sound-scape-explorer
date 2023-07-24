import {reactive} from 'vue';

interface BandRef {
  value: string | null;
}

export const bandRef = reactive<BandRef>({
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
