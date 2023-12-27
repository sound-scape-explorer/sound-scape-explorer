import {ref} from 'vue';

export function useAudioComponent() {
  const containerRef = ref<HTMLDivElement | null>(null);
  const waveformContainerRef = ref<HTMLDivElement | null>(null);
  const spectrogramContainerRef = ref<HTMLDivElement | null>(null);

  return {
    containerRef: containerRef,
    waveformContainerRef: waveformContainerRef,
    spectrogramContainerRef: spectrogramContainerRef,
  };
}
