import {useStorage} from '@vueuse/core';
import {SettingDefault} from 'src/common/setting-default';
import {SettingKey} from 'src/common/setting-key';
import {useStorageSettings} from 'src/composables/use-storage-settings';

const audioHost = useStorage<string>(
  SettingKey.audioHost,
  SettingDefault.audioHost,
);

export function useStorageAudioHost() {
  const {settings} = useStorageSettings();

  const read = () => {
    if (settings.value === null) {
      return;
    }

    if (settings.value.audio_host === '') {
      return;
    }

    audioHost.value = settings.value.audio_host;
  };

  return {
    audioHost: audioHost,
    read: read,
  };
}
