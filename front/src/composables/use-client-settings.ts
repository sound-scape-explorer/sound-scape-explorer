import {createSettingsRefs, Settings} from 'src/common/settings';

const refs = createSettingsRefs();

export function useClientSettings() {
  const resetAll = () => {
    const shape = Settings.shape;

    Object.entries(shape).forEach(([key, schema]) => {
      refs[key as keyof typeof refs].value = schema.parse(undefined);
    });

    // todo: add notification
    console.log('reset all');
  };

  return {
    ...refs,
    resetAll,
  };
}
