import {SERVER_HOSTNAME} from '../constants';
import type {ConfigInterface} from '../interfaces/config.interface';
import type {ConfigStore} from '../store/config.store';
import {configStore} from '../store/config.store';

export async function useConfig(): Promise<ConfigStore> {
  if (configStore.isLoaded) {
    return configStore;
  }

  function parseSites(c: ConfigInterface) {
    return [...new Set(
      Object.values(c.files).map((f) => f[0]),
    )];
  }

  const request = await fetch(`${SERVER_HOSTNAME}/generated/ghost-config.json`);
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
