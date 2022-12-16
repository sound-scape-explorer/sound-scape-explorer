import {API_ROUTES} from '../constants';

interface FetchFeaturesBySiteProps {
  band: string;
  range: string;
  site: string;
  time: number;
}

export async function fetchFeatures(props: FetchFeaturesBySiteProps): Promise<number[]> {
  const response = await fetch(API_ROUTES.features(props));
  const json = await response.json();

  if (json.success === false) {
    return [];
  }

  return json.data;
}
