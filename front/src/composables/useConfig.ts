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

  try {
    const request = await fetch(API_ROUTES.config);
    const data: ConfigInterface = await request.json();

    configStore.isLoaded = true;
    configStore.isError = false;
    configStore.config = data;
    configStore.bands = Object.keys(data.bands);
    configStore.intervals = data.variables.integration_seconds.split('-').map((i) => Number(i));
    configStore.intervalLabels = Object.keys(data.umaps);
    configStore.ranges = Object.keys(data.ranges);
    configStore.sites = parseSites(data);

    return configStore;
  } catch {
    configStore.isError = true;
    return configStore;
  }
}
