from typing import TypedDict


# INFO: The interface for `Config.__settings` class attribute.
class ConfigSettings(TypedDict):
    audio_path: str
    audio_host: str
    expected_sample_rate: int
    timezone: str
    computation_umap_dimensions: int
    computation_umap_iterations: int
    display_umap_seed: int
