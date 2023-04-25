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

export interface GenerateScatterDatasetProps {
  features: number[][];
  files: string[];
  timestamps: number[];
  metas: string[][];
  autocluster: number[];
  lengthPerGroup: number;
}

export function generateScatterDataset(props: GenerateScatterDatasetProps) {
  const dataPoints: Point2D[] = props.features as unknown as Point2D[];
  const metadata: ScatterMetadata[] = [];

  let count = 0;

  for (let fileIndex = 0; fileIndex < props.files.length; fileIndex += 1) {
    for (let j = 0; j < props.lengthPerGroup; j += 1) {
      const groupIndex = j;
      const pointIndex = count;
      const timestamp = props.timestamps[pointIndex];
      const metaValues = [...props.metas[fileIndex]];

      // TODO: Remove this after storage update.
      if (props.autocluster.length > 0) {
        metaValues.unshift(props.autocluster[count].toString());
      }

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

  return new ScatterGL.Dataset(
    dataPoints,
    metadata as unknown as PointMetadata[],
  );
}
