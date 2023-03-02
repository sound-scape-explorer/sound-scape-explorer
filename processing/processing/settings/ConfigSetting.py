from typing import TypedDict


class ConfigSettings(TypedDict):
    base_path: str
    audio_folder: str
    expected_sample_rate: int
    umap_seed: int
