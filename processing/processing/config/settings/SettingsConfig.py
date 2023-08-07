from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class SettingsConfig:
    audio_path: str
    audio_host: str
    expected_sample_rate: int
    timeline_origin: int

    timezone: Optional[str]
    computation_umap_dimensions: Optional[int]
    computation_umap_iterations: Optional[int]
    display_umap_seed: Optional[int]
