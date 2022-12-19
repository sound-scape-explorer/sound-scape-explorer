import {API_ROUTES} from '../constants';

interface FetchFeaturesBySiteProps {
  interval: string;
  band: string;
  range: string;
  site: string;
  timestamp: number;
}

export async function fetchFeatures(props: FetchFeaturesBySiteProps): Promise<number[]> {
  const response = await fetch(API_ROUTES.features(props));
  const json = await response.json();

  try {
    return json;
  } catch (error) {
    console.error(error);
    return [];
  }
}
