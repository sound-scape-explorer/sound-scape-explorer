import {MetricImplEnum, MetricTypeEnum} from '@shared/enums';

type MetricTypeByImpl = Record<MetricImplEnum, MetricTypeEnum>;

export const metricTypeByImpl: MetricTypeByImpl = {
  [MetricImplEnum.enum.MEAN_STD]: MetricTypeEnum.enum.ONE_D,
  [MetricImplEnum.enum.MEAN_SPREADING]: MetricTypeEnum.enum.ONE_D,
  [MetricImplEnum.enum.OVERLAP]: MetricTypeEnum.enum.TWO_D,
  [MetricImplEnum.enum.SILHOUETTE]: MetricTypeEnum.enum.TWO_D,
  [MetricImplEnum.enum.CONTINGENCY]: MetricTypeEnum.enum.TWO_D_PAIRING,
};
