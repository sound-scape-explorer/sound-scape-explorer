import {useAppNotification} from 'src/app/app-notification/app-notification';
import {reactive} from 'vue';

interface AudioIsLoadingRef {
  value: boolean;
}

export const audioIsLoadingRef = reactive<AudioIsLoadingRef>({
  value: false,
});

export function useAudioLoading() {
  const {notify} = useAppNotification();
  const verifyAudioLoading = (): boolean => {
    if (audioIsLoadingRef.value === true) {
      notify('error', 'Audio is already loading', '');
      return false;
    }

    return true;
  };

  return {
    verifyAudioLoading: verifyAudioLoading,
  };
}
