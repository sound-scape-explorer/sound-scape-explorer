import type {ApiUMAPInterface} from '../interfaces/api-UMAP.interface';
import type {Point2D, PointMetadata} from 'scatter-gl';
import {ScatterGL} from 'scatter-gl';

export function getScatterGlDataset(data: ApiUMAPInterface) {
  const dataPoints: Point2D[] = [];
  const metadata: PointMetadata[] = [];

  data.X.forEach((coordinates, index) => {
    dataPoints.push(coordinates as Point2D);

    const label = data?.l[index];
    const labelIndex = label && data?.l.indexOf(label);
    const timestamp = data.t[index];

    metadata.push({
      labelIndex,
      label,
      timestamp,
    });
  });

  return new ScatterGL.Dataset(dataPoints, metadata);
}
