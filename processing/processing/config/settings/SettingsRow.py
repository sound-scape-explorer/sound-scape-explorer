from enum import Enum


class SettingsRow(Enum):
    # Mandatory settings
    storage_path = "storage_path"
    audio_path = "audio_path"
    audio_host = "audio_host"
    expected_sample_rate = "expected_sample_rate"
    timeline_origin = "timeline_origin"

    # Optional settings
    timezone = "timezone"
    c_umap_dimensions = "computation_umap_dimensions"
    c_umap_iterations = "computation_umap_iterations"
    display_umap_seed = "display_umap_seed"
