import speedToPercentage from 'speed-to-percentage';
import speedToSemitones from 'speed-to-semitones';
import {reactive, watch, watchEffect} from 'vue';

import {PLAYBACK_RATE} from '../../constants';
import {settingsRef} from '../../hooks/useStorageSettings';
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
    if (settingsRef.value === null) {
      return;
    }

    audioRateHumanReadableRef.value = {
      hertz: (
        settingsRef.value['expected_sample_rate'] * audioRateRef.value
      ).toFixed(),
      percentage: speedToPercentage(audioRateRef.value, 2),
      semitones: speedToSemitones(audioRateRef.value, 2),
    };
  };

  watchEffect(updateHumanReadableValues);
}
