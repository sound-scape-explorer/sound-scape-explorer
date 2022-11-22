import type {ApiUMAPInterface} from '../interfaces/api-UMAP.interface';
import type {Point2D, PointMetadata} from 'scatter-gl';
import {ScatterGL} from 'scatter-gl';
import {findTags} from './find-tags';

export function convertToScatterGlDataset(data: ApiUMAPInterface) {
  const dataPoints: Point2D[] = [];
  const metadata: PointMetadata[] = [];

  data.X.forEach((coordinates, index) => {
    dataPoints.push(coordinates as Point2D);

    const label = data?.l[index];
    const labelIndex = label && data?.l.indexOf(label);
    const timestamp = data.t[index];

    const tags = findTags(timestamp, label);

    metadata.push({
      labelIndex,
      label,
      timestamp,
      tags,
    });
  });

  return new ScatterGL.Dataset(dataPoints, metadata);
}
