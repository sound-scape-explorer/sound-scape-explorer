import {BandIntegration, BandName} from './config.dto';

export interface CoveringDto {
  integration: BandIntegration;
  band: BandName;
  data: {
    [key: string]: {
      meandist: number[];
      t: number[];
    };
  };
}
