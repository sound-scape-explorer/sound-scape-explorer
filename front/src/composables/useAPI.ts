import {API_ROUTES} from '../constants';
import type {ApiUMAPInterface} from '../interfaces/api-UMAP.interface';
import {useNotification} from './useNotification';

export function useAPI() {
  const {notify} = useNotification();

  async function fetchUMAP(interval: string, band: string): Promise<ApiUMAPInterface | void> {
    const endpoint = API_ROUTES.umap({integration: interval, band});
    const request = await fetch(endpoint);

    if (!request.ok) {
      notify('error', 'UMAP data could not be fetched!', `interval ${interval}, band ${band}`);
      return;
    }

    return request.json();
  }

  return {
    fetchUMAP,
  };
}
