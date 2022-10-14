import {API_ROUTES} from '../constants';
import type {ConfigInterface} from '../interfaces/config.interface';
import type {ConfigStoreInterface} from '../store/config.store';
import {configStore} from '../store/config.store';

export async function useConfig(): Promise<ConfigStoreInterface> {
  if (configStore.isLoaded) {
    return configStore;
  }

  function parseSites(c: ConfigInterface) {
    return [...new Set(
      Object.values(c.files).map((f) => f[0]),
    )];
  }

  const request = await fetch(API_ROUTES.config);
  const data = await request.json();

  if (!data) {
    throw new Error('Data is not defined');
  }

  configStore.isLoaded = true;
  configStore.config = data;
  configStore.bands = Object.keys(data.bands);
  configStore.intervals = Object.keys(data.umaps).map((umap) => data.umaps[umap][0]);
  configStore.intervalLabels = Object.keys(data.umaps);
  configStore.ranges = Object.keys(data.ranges);
  configStore.sites = parseSites(data);

  return configStore;
}
