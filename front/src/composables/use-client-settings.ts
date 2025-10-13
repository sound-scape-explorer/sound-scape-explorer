import {useAppNotification} from 'src/app/notification/use-app-notification';
import {createSettingsRefs, Settings} from 'src/common/Settings';

const refs = createSettingsRefs();

export function useClientSettings() {
  const {notify} = useAppNotification();

  const resetAll = () => {
    const shape = Settings.shape;

    Object.entries(shape).forEach(([key, schema]) => {
      refs[key as keyof typeof refs].value = schema.parse(undefined);
    });

    notify('success', 'settings', 'Settings reset');
  };

  return {
    ...refs,
    resetAll,
  };
}
