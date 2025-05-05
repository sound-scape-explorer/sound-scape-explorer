import {AUDIO_HOST_DEFAULT} from '@shared/constants';
import {useStorage} from '@vueuse/core';
import {settingDefaults} from 'src/common/setting-defaults';
import {SettingKey} from 'src/common/setting-key';
import {useConfig} from 'src/composables/use-config';

const audioHost = useStorage<string>(
  SettingKey.audioHost,
  settingDefaults.audioHost,
);

export function useAudioHost() {
  const {config} = useConfig();

  const sanitizeHost = (host: string): string => {
    if (host.endsWith('/')) {
      return sanitizeHost(host.slice(0, host.length - 1));
    }

    return host;
  };

  const read = () => {
    if (config.value === null) {
      return;
    }

    if (config.value.settings.audio_host === AUDIO_HOST_DEFAULT) {
      return;
    }

    const host = config.value.settings.audio_host;
    audioHost.value = sanitizeHost(host);
  };

  return {
    audioHost,
    read,
  };
}
