import type {Point2D, PointMetadata} from '../lib/scatter-gl-0.0.13';
import {ScatterGL} from '../lib/scatter-gl-0.0.13';

interface MyMetadata {
  labelIndex: number;
  label: string;
  timestamp: number;
  tags: string;
  metaValues: string[];
}

export function convertToScatterGlDataset(
  features: number[][][],
  timestamps: number[],
) {
  const dataPoints: Point2D[] = features.flat() as unknown as Point2D[];
  const metadata: MyMetadata[] = [];

  for (let i = 0; i < dataPoints.length; i += 1) {
    const label = i.toString();
    const labelIndex = i;
    const timestamp = timestamps[i];

    metadata.push({
      label,
      labelIndex,
      timestamp,
      tags: '',
      metaValues: [''],
    });
  }

  // data.X.forEach((coordinates, index) => {
  //   dataPoints.push(coordinates as Point2D);
  //
  //   const label = data?.l[index];
  //   const labelIndex = label && data?.l.indexOf(label);
  //   const timestamp = data.t[index];
  //
  //   const {site} = getRangeAndSiteFromDatasetLabel(label);
  //   const tags = findTags(timestamp, `/${site}`);
  //   const metaValues = data.c[index];
  //
  //   if (labelIndex === '') {
  //     return;
  //   }

  // metadata.push({
  //   labelIndex,
  //   label,
  //   timestamp,
  //   tags,
  //   metaValues,
  // });
  // });

  return new ScatterGL.Dataset(dataPoints, metadata as unknown as PointMetadata[]);
}
