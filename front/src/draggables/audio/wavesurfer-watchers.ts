import {useAudioFourier} from 'src/draggables/audio/audio-component';
import {useWavesurfer} from 'src/draggables/audio/wavesurfer';
import {watch} from 'vue';

export function useWavesurferWatchers() {
  const {ws} = useWavesurfer();
  const {size} = useAudioFourier();

  const updateSpectrogramDefinition = () => {
    if (ws.value === null) {
      return;
    }

    // @ts-expect-error overwrite variable
    ws.value.spectrogram.fftSamples = size.value;
    ws.value.drawBuffer();
  };

  watch(size, updateSpectrogramDefinition);
}
