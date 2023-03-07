import type {Point2D, PointMetadata} from '../lib/scatter-gl-0.0.13';
import {ScatterGL} from '../lib/scatter-gl-0.0.13';
import {getIntegratedIndex} from './get-integrated-index';

interface MyMetadata {
  labelIndex: number;
  label: string;
  timestamp: number;
  tags: string;
  metaValues: string[];
}

interface Props {
  features: number[][][];
  files: string[];
  timestamps: number[];
  metas: string[][];
}

export function convertToScatterGlDataset(props: Props) {
  const dataPoints: Point2D[] = props.features.flat() as unknown as Point2D[];
  const metadata: MyMetadata[] = [];

  for (let i = 0; i < dataPoints.length; i += 1) {
    const integratedIndex = getIntegratedIndex(i, props.files.length);

    const label = props.files[integratedIndex];
    const labelIndex = i;
    const timestamp = props.timestamps[i];
    const tags = '';
    const metaValues = props.metas[integratedIndex];

    metadata.push({
      label,
      labelIndex,
      timestamp,
      tags,
      metaValues,
    });
  }

  return new ScatterGL.Dataset(dataPoints, metadata as unknown as PointMetadata[]);
}
