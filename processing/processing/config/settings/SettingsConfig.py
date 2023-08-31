from dataclasses import dataclass
from typing import Union


@dataclass(frozen=True)
class SettingsConfig:
    audio_path: str
    audio_host: str
    expected_sample_rate: int
    timeline_origin: int

    timezone: Union[str, None]
    computation_umap_dimensions: int
    computation_umap_iterations: int
    display_umap_seed: int
