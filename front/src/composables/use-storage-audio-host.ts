import {useStorage} from '@vueuse/core';
import {SettingDefault} from 'src/common/setting-default';
import {SettingKey} from 'src/common/setting-key';
import {useSettings} from 'src/composables/use-settings';

const audioHost = useStorage<string>(
  SettingKey.audioHost,
  SettingDefault.audioHost,
);

export function useStorageAudioHost() {
  const {settings} = useSettings();

  const sanitizeHost = (host: string): string => {
    if (host.endsWith('/')) {
      return sanitizeHost(host.slice(0, host.length - 1));
    }

    return host;
  };

  const read = () => {
    if (settings.value === null) {
      return;
    }

    if (settings.value.audio_host === '') {
      return;
    }

    const host = settings.value.audio_host;
    audioHost.value = sanitizeHost(host);
  };

  return {
    audioHost: audioHost,
    read: read,
  };
}
