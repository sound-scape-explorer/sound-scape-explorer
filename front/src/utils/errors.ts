import {useAppNotification} from 'src/app/notification/use-app-notification';

const {notify} = useAppNotification();

export function handleGlobalErrors(err: unknown) {
  const error = err instanceof Error ? err : new Error(String(err));
  notify('error', error.name, error.message);
}
