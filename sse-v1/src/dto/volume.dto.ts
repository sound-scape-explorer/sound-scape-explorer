import {BandIntegration, BandName} from './config.dto';

export interface VolumeDto {
  band: BandName;
  integration: BandIntegration;
  data: {
    // key: ${StringMapName} ${SiteName}
    [key: string]: {
      sumvar: number[];
      sumstd: number[];
      logprodspan: number[];
      t: number[];
      i: number[];
    };
  };
}
