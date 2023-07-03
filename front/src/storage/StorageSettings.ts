export interface StorageSettings {
  audio_path: string;
  audio_host: string;
  expected_sample_rate: number;
  timezone?: string;
  umap_seed?: number;
  umap_neighbors: number;
  umap_metric?: string;
  autocluster_iterations?: number;
  autocluster_min_size?: number;
  autocluster_max_size?: number;
  autocluster_threshold?: number;
}
