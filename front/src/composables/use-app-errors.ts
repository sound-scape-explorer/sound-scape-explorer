import {useAppNotification} from 'src/app/notification/use-app-notification';

export function useAppErrors() {
  const {notify} = useAppNotification();

  const emitAudioError = async (err: unknown) => {
    notify('error', 'audio', `${err}`);
  };

  return {
    emitAudioError: emitAudioError,
  };
}
