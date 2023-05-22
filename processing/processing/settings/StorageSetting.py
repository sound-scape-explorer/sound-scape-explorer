from enum import Enum


class StorageSetting(Enum):
    base_path = "base_path"
    audio_folder = "audio_folder"
    expected_sample_rate = "expected_sample_rate"
    timezone = "timezone"
    umap_seed = "umap_seed"
    umap_neighbors = "umap_neighbors"
    umap_metric = "umap_metric"
    autocluster = "autocluster"
    autocluster_iterations = "autocluster_iterations"
    autocluster_min_size = "autocluster_min_size"
    autocluster_max_size = "autocluster_max_size"
    autocluster_threshold = "autocluster_threshold"
