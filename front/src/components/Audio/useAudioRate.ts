import speedToPercentage from 'speed-to-percentage';
import speedToSemitones from 'speed-to-semitones';
import {reactive, watch, watchEffect} from 'vue';

import {useStorageSettings} from '../../composables/storage-settings';
import {PLAYBACK_RATE} from '../../constants';
import {waveSurferRef} from './useWaveSurfer';

interface AudioRateRef {
  value: number;
}

export const audioRateRef = reactive<AudioRateRef>({
  value: PLAYBACK_RATE.default,
});

interface AudioRateHumanReadableRef {
  value: {
    hertz: string;
    percentage: string;
    semitones: string;
  };
}

const audioRateHumanReadableDefaults = {
  hertz: '',
  percentage: '',
  semitones: '',
};

export const audioRateHumanReadableRef = reactive<AudioRateHumanReadableRef>({
  value: audioRateHumanReadableDefaults,
});

interface UseAudioRateProps {
  togglePlayPause: () => void;
}

// Playback rate: audio speed
export function useAudioRate({togglePlayPause}: UseAudioRateProps) {
  const {settings} = useStorageSettings();

  const updatePlaybackRate = () => {
    if (waveSurferRef.value === null) {
      return;
    }

    waveSurferRef.value.pause();
    waveSurferRef.value.setPlaybackRate(audioRateRef.value);
    togglePlayPause();
  };

  watch(audioRateRef, updatePlaybackRate);

  const updateHumanReadableValues = () => {
    if (settings.value === null) {
      return;
    }

    audioRateHumanReadableRef.value = {
      hertz: (
        settings.value['expected_sample_rate'] * audioRateRef.value
      ).toFixed(),
      percentage: speedToPercentage(audioRateRef.value, 2),
      semitones: speedToSemitones(audioRateRef.value, 2),
    };
  };

  watchEffect(updateHumanReadableValues);
}
