from enum import Enum


# INFO: Enumeration of the actual namings of settings
# within the Excel configuration file.
class StorageSetting(Enum):
    audio_path = "audio_path"
    audio_host = "audio_host"
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
