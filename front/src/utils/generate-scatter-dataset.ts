import type {Point2D, PointMetadata} from '../lib/scatter-gl-0.0.13';
import {ScatterGL} from '../lib/scatter-gl-0.0.13';

export interface ScatterMetadata {
  label: string;
  fileIndex: number;
  groupIndex: number;
  pointIndex: number;
  timestamp: number;
  metaValues: string[];
}

interface Props {
  features: number[][][];
  files: string[];
  timestamps: number[];
  metas: string[][];
  autocluster: number[];
}

export function generateScatterDataset(props: Props) {
  const dataPoints: Point2D[] = props.features.flat() as unknown as Point2D[];
  const metadata: ScatterMetadata[] = [];
  const integrations = props.features.flat().length / props.features.length;

  let count = 0;

  for (let i = 0; i < props.files.length; i += 1) {
    const fileIndex = i;

    for (let j = 0; j < integrations; j += 1) {
      const groupIndex = j;
      const pointIndex = count;
      const timestamp = props.timestamps[pointIndex];

      // TODO: Remove this after storage update.
      const metaValues = [...props.metas[i]];
      metaValues.unshift(props.autocluster[count].toString());

      metadata.push({
        label: pointIndex.toString(),
        fileIndex: fileIndex,
        groupIndex: groupIndex,
        pointIndex: pointIndex,
        timestamp: timestamp,
        metaValues: metaValues,
      });

      count += 1;
    }
  }

  return new ScatterGL.Dataset(dataPoints, metadata as unknown as PointMetadata[]);
}
