import type {ApiUMAPInterface} from '../interfaces/api-UMAP.interface';
import type {Point2D, PointMetadata} from '../lib/scatter-gl-0.0.13';
import {ScatterGL} from '../lib/scatter-gl-0.0.13';
import {findTags} from './find-tags';
import {
  getRangeAndSiteFromDatasetLabel,
} from './get-range-and-site-from-dataset-label';

interface MyMetadata {
  labelIndex: number;
  label: string;
  timestamp: number;
  tags: string;
  metaContent: string[];
}

export function convertToScatterGlDataset(data: ApiUMAPInterface) {
  const dataPoints: Point2D[] = [];
  const metadata: MyMetadata[] = [];

  data.X.forEach((coordinates, index) => {
    dataPoints.push(coordinates as Point2D);

    const label = data?.l[index];
    const labelIndex = label && data?.l.indexOf(label);
    const timestamp = data.t[index];

    const {site} = getRangeAndSiteFromDatasetLabel(label);
    const tags = findTags(timestamp, `/${site}`);
    const metaContent = data.c[index];

    if (labelIndex === '') {
      return;
    }

    metadata.push({
      labelIndex,
      label,
      timestamp,
      tags,
      metaContent,
    });
  });

  return new ScatterGL.Dataset(dataPoints, metadata as unknown as PointMetadata[]);
}
