import {MetricImplEnum} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function ExtractionMetricsDrawerContent() {
  return (
    <DrawerContent
      content={[
        [MetricImplEnum.enum.MEAN_STD, 'The mean standard deviation.'],
        [MetricImplEnum.enum.MEAN_SPREADING, 'The mean spreading.'],
        [
          MetricImplEnum.enum.SILHOUETTE,
          'The silhouette between subtypes of a given cluster.',
        ],
        [MetricImplEnum.enum.CONTINGENCY, 'Contingency between two clusters.'],
        [
          MetricImplEnum.enum.OVERLAP,
          'The overlap between subtypes of a given cluster.',
        ],
      ]}
    />
  );
}
