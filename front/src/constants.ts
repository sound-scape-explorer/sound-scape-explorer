export const BACK_HOSTNAME = 'http://localhost:8081';

export const SCATTER_PLOT_DEFAULT_COLOR = 'red';

export const ALERT_TIMER = 5000;

export const TAG_PREFIX = '@';

export const PREGENERATED_HUES_LENGTH = 1000;

export const UMAP_EXPORT_FILENAME = 'SSE_UMAP';

export const RENDERING_DELAY_SLOW = 250;

export const SLIDER_LIMITS = {
  start: '⟦',
  end: '⟧',
};

export const DATE_FORMAT = 'DD MMM YYYY HH:mm:ss';

interface APIRoutesDefaultParameters {
  integration: string;
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
      integration,
      band,
    }: APIRoutesCoveringParameters) => `${BACK_HOSTNAME}/covering/${integration}/${band}`,
  volumes: (
    {
      integration,
      band,
    }: APIRoutesVolumesParameters,
  ) => `${BACK_HOSTNAME}/volumes/${integration}/${band}`,
  volumesImage: (
    {
      integration,
      band,
      variable,
    }: APIRoutesVolumesImageParameters,
  ) => `${BACK_HOSTNAME}/volumes/${integration}/${band}/${variable}`,
  umap: (
    {
      integration,
      band,
      isImage = false,
    }: APIRoutesUMAPParameters,
  ) => `${BACK_HOSTNAME}/umap/${integration}/${band}${isImage ? '/image' : ''}`,
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
