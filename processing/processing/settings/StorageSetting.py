from enum import Enum


# INFO: Enumeration of the actual namings of settings
# within the Excel configuration file.
class StorageSetting(Enum):
    # Mandatory settings
    audio_path = "audio_path"
    audio_host = "audio_host"
    expected_sample_rate = "expected_sample_rate"
    timeline_origin = "timeline_origin"

    # Optional settings
    timezone = "timezone"
    computation_umap_dimensions = "computation_umap_dimensions"
    computation_umap_iterations = "computation_umap_iterations"
    display_umap_seed = "display_umap_seed"
