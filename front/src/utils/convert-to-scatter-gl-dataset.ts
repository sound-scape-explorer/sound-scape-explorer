import type {Point2D, PointMetadata} from '../lib/scatter-gl-0.0.13';
import {ScatterGL} from '../lib/scatter-gl-0.0.13';

export interface ScatterMetadata {
  labelIndex: number;
  label: string;
  timestamp: number;
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
  const metadata: ScatterMetadata[] = [];
  const integrations = props.features.flat().length / props.features.length;
  let count = 0;

  for (let i = 0; i < props.files.length; i += 1) {
    const label = props.files[i];
    const metaValues = props.metas[i];

    for (let j = 0; j < integrations; j += 1) {
      const labelIndex = count;
      const timestamp = props.timestamps[labelIndex];

      metadata.push({
        label,
        labelIndex,
        timestamp,
        metaValues,
      });

      count += 1;
    }
  }

  return new ScatterGL.Dataset(dataPoints, metadata as unknown as PointMetadata[]);
}
