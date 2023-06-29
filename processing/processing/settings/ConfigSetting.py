from typing import TypedDict

import numpy


# INFO: The interface for `Config.__settings` class attribute.
class ConfigSettings(TypedDict):
    base_path: str
    audio_folder: str
    audio_host: str
    expected_sample_rate: int
    timezone: str
    umap_seed: int
    umap_neighbors: int
    umap_metric: str
    autocluster: numpy.bool_
    autocluster_iterations: int
    autocluster_min_size: int
    autocluster_max_size: int
    autocluster_threshold: float
