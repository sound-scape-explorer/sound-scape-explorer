import {type ConfigDto} from './dtos';

export function inferFilename(config: ConfigDto) {
  return config.settings.storagePath.replace('.h5', '.json');
}
