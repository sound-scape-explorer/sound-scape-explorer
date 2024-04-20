import {useAppNotification} from 'src/components/AppNotification/useAppNotification';
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
