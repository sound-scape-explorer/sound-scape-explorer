import {DigesterImpl} from '@shared/enums';
import {type DigesterDtoWithType} from 'src/dtos';

type DigesterTypeMap = Record<DigesterImpl, DigesterDtoWithType['type']>;

export const digesterTypeMap: DigesterTypeMap = {
  [DigesterImpl.sum_var]: '1d',
  [DigesterImpl.sum_std]: '1d',
  [DigesterImpl.mean_std]: '1d',
  [DigesterImpl.mean_spreading]: '1d',
  [DigesterImpl.distance]: '2d',
  [DigesterImpl.overlap]: '2d',
  [DigesterImpl.silhouette]: '2d',
  [DigesterImpl.contingency]: '2d-pairing',
};
