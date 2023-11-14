export interface StorageSettings {
  storage_path: string;
  audio_path: string;
  expected_sample_rate: number;
  timeline_origin: number;

  // Optional, see `SettingsDefaults.py`
  audio_host: string;
  timezone: string;
  computation_umap_dimensions: number;
  compoutation_umap_iterations: number;
  display_umap_seed: number;
}
