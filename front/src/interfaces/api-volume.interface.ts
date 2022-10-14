export interface ApiVolumeInterface {
  band: string;
  integration: number;
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
