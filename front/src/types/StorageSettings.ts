export interface StorageSettings {
  base_path: string;
  audio_folder: string;
  audio_host: string;
  expected_sample_rate: number;
  umap_seed?: number;
  timezone?: string;
  display_in_utc_plus: string;
  display_locale: string;
}
