import {MetricImpl, MetricType} from '@shared/enums';

type MetricTypeByImpl = Record<MetricImpl, MetricType>;

export const metricTypeByImpl: MetricTypeByImpl = {
  [MetricImpl.enum.MEAN_STD]: MetricType.enum.ONE_D,
  [MetricImpl.enum.MEAN_SPREADING]: MetricType.enum.ONE_D,
  [MetricImpl.enum.OVERLAP]: MetricType.enum.TWO_D,
  [MetricImpl.enum.SILHOUETTE]: MetricType.enum.TWO_D,
  [MetricImpl.enum.CONTINGENCY]: MetricType.enum.TWO_D_PAIRING,
};
