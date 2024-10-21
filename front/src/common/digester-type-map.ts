import {type DigesterName} from 'src/common/digester-name';

export type DigesterType = '1d' | '2d' | '2d-pairing';

type DigesterTypeMap = Record<DigesterName, DigesterType>;

export const digesterTypeMap: DigesterTypeMap = {
  sum_var: '1d',
  sum_std: '1d',
  mean_std: '1d',
  mean_spreading: '1d',
  distance: '2d',
  overlap: '2d',
  silhouette: '2d',
  contingency: '2d-pairing',
};
