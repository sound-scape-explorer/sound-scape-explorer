import type {Config} from './fetch-config';

export function parseIntervalLabels(config: Config): string[] {
  return Object.keys(config.umaps);
}
