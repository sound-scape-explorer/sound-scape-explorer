type BandIntegration = number;
type BandName = string;
type ConfigDate = string;
type FileTags = string[];
type FileColumns = string[];
type SiteColor = string;
type SiteDetails = string;
type SiteName = string;
type StringMapName = string;

export interface ConfigInterface {
  xlsx: string;
  sheet: number;
  unique_columns: string[][];
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
    umap_random: string;
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
      FileColumns,
    ];
  };
}
