import {useClientSettings} from 'src/composables/use-client-settings';
import {useAudioAnalyser} from 'src/draggables/audio/use-audio-analyser';
import {useAudioTransport} from 'src/draggables/audio/use-audio-transport';
import {useWavesurferLoader} from 'src/draggables/audio/use-wavesurfer-loader';
import {watch} from 'vue';

export function useAudioLifecycles() {
  const {isPlaying} = useAudioTransport();
  const {update, isClipping, fade} = useAudioAnalyser();
  const {audioFilterSlope} = useClientSettings();
  const {connect} = useWavesurferLoader();

  // filter slope update
  watch(audioFilterSlope, connect);

  // vu meter updates
  watch(isPlaying, () => {
    if (isPlaying.value === false) {
      return;
    }

    update();
  });

  // vu meter clip
  watch(isClipping, fade);
}
