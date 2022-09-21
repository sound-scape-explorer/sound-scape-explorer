import {BandName, SiteName, StringMapName, UmapIntegration} from './config.dto';

interface VolumeData {
  sumvar: number[];
  sumstd: number[];
  logprodspan: number[];
  t: number[];
  i: number[];
}

type VolumeName = StringMapName & SiteName

export interface VolumeDto {
  band: BandName;
  integration: UmapIntegration;
  data: {
    [key: VolumeName]: VolumeData;
  };
}
