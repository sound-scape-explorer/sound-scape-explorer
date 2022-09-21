export type BandIntegration = number;
export type BandName = string;
export type ConfigDate = string;
export type FileTags = string[];
export type SiteColor = string;
export type SiteDetails = string;
export type SiteName = string;
export type StringMapName = string;

export interface ConfigDto {
  xlsx: string;
  sheet: number;
  variables: {
    audio_base: string;
    audio_base_cluster: string;
    audio_expected_sample_rate: string;
    audio_suffix: string;
    feature_base: string;
    generated_base: string;
    other_base: string;
    preview_file: string;
    preview_file_start: string;
    preview_file_dur: string;
    display_in_utc_plus: string;
    display_locale: string;
    integration_seconds: string;
    nearest_radiuses: string;
  };
  bands: {
    [band: BandName]: string;
  };
  umaps: {
    [umap: string]: [
      BandIntegration,
      BandName[],
      StringMapName[],
      SiteName[],
    ];
  };
  ranges: {
    [range: string]: ConfigDate[];
  };
  stringmap: {
    [key: StringMapName]: [
      SiteDetails,
      SiteColor
    ];
  };
  files: {
    [file: string]: [
      SiteName,
      ConfigDate,
      FileTags,
    ];
  };
}
