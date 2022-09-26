import type {Config} from './fetch-config';

export function parseIntervals(config: Config): number[] {
  return Object.keys(config.umaps).map((umap) => {
    return config.umaps[umap][0];
  });
}
