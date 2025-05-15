import {MetricImpl} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function ExtractionMetricsDrawerContent() {
  return (
    <DrawerContent
      content={[
        [MetricImpl.enum.MEAN_STD, 'The mean standard deviation.'],
        [MetricImpl.enum.MEAN_SPREADING, 'The mean spreading.'],
        [
          MetricImpl.enum.SILHOUETTE,
          'The silhouette between subtypes of a given cluster.',
        ],
        [MetricImpl.enum.CONTINGENCY, 'Contingency between two clusters.'],
        [
          MetricImpl.enum.OVERLAP,
          'The overlap between subtypes of a given cluster.',
        ],
      ]}
    />
  );
}
