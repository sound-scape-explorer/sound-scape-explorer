from typing import TypedDict


class ConfigSettings(TypedDict):
    umap_seed: int
    expected_sample_rate: int
    base_path: str
    audio_folder: str
