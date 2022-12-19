export const BACK_HOSTNAME = 'http://localhost:8081';

export const SCATTER_PLOT_DEFAULT_COLOR = 'red';

export const ALERT_TIMER = 5000;

export const TAG_PREFIX = '@';

export const PREGENERATED_HUES_LENGTH = 1000;

export const UMAP_WINDOW_TIME = 3600; // seconds

export const UMAP_EXPORT_FILENAME = 'SSE_UMAP';

interface APIRoutesDefaultParameters {
  interval: string;
  band: string;
}

type APIRoutesCoveringParameters = APIRoutesDefaultParameters
type APIRoutesVolumesParameters = APIRoutesDefaultParameters

interface APIRoutesVolumesImageParameters extends APIRoutesDefaultParameters {
  variable: string;
}

interface APIRoutesUMAPParameters extends APIRoutesDefaultParameters {
  isImage?: boolean;
}

interface APIRoutesFeaturesParameters {
  interval: string;
  band: string;
  range: string;
  site: string;
  timestamp: number;
}

export const API_ROUTES = {
  config: `${BACK_HOSTNAME}/config`,
  covering: (
    {
      interval,
      band,
    }: APIRoutesCoveringParameters) => `${BACK_HOSTNAME}/covering/${interval}/${band}`,
  volumes: (
    {
      interval,
      band,
    }: APIRoutesVolumesParameters,
  ) => `${BACK_HOSTNAME}/volumes/${interval}/${band}`,
  volumesImage: (
    {
      interval,
      band,
      variable,
    }: APIRoutesVolumesImageParameters,
  ) => `${BACK_HOSTNAME}/volumes/${interval}/${band}/${variable}`,
  umap: (
    {
      interval,
      band,
      isImage = false,
    }: APIRoutesUMAPParameters,
  ) => `${BACK_HOSTNAME}/umap/${interval}/${band}${isImage ? '/image' : ''}`,
  features: (
    {
      interval,
      band,
      range,
      site,
      timestamp,
    }: APIRoutesFeaturesParameters,
  ) => `${BACK_HOSTNAME}/features/${interval}/${band}/${range}/${site}/${timestamp}`,
};
