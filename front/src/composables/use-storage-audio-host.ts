import {useStorage} from '@vueuse/core';
import {SettingDefault} from 'src/common/setting-default';
import {SettingKey} from 'src/common/setting-key';
import {useStorageSettings} from 'src/composables/use-storage-settings';
import {watch} from 'vue';

const audioHost = useStorage<string>(
  SettingKey.audioHost,
  SettingDefault.audioHost,
);

export function useStorageAudioHost() {
  const {settings} = useStorageSettings();

  const readAudioHost = () => {
    if (settings.value === null) {
      return;
    }

    if (settings.value.audio_host === '') {
      return;
    }

    audioHost.value = settings.value.audio_host;
  };

  watch(settings, readAudioHost);

  return {
    audioHost: audioHost,
  };
}
