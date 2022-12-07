import type {ApiUMAPInterface} from '../interfaces/api-UMAP.interface';
import type {Point2D, PointMetadata} from 'scatter-gl';
import {ScatterGL} from 'scatter-gl';
import {findTags} from './find-tags';

interface MyMetadata {
  labelIndex: number;
  label: string;
  timestamp: number;
  tags: string;
  columns: string[];
}

export function convertToScatterGlDataset(data: ApiUMAPInterface) {
  const dataPoints: Point2D[] = [];
  const metadata: MyMetadata[] = [];

  data.X.forEach((coordinates, index) => {
    dataPoints.push(coordinates as Point2D);

    const label = data?.l[index];
    const labelIndex = label && data?.l.indexOf(label);
    const timestamp = data.t[index];

    const tags = findTags(timestamp, label);
    const columns = data.c[index];

    if (labelIndex === '') {
      return;
    }

    metadata.push({
      labelIndex,
      label,
      timestamp,
      tags,
      columns,
    });
  });

  // TODO: ugly
  return new ScatterGL.Dataset(dataPoints, metadata as unknown as PointMetadata[]);
}
