import {ref} from 'vue';
import WaveSurfer from 'wavesurfer.js';

const ws = ref<WaveSurfer | null>(null);

export function useWavesurfer() {
  return {
    ws: ws,
  };
}
