import type {Config} from './fetch-config';

export function parseBands(config: Config): string[] {
  return Object.keys(config.bands);
}
