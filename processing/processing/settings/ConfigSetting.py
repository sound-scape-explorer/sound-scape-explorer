from typing import TypedDict

import numpy


class ConfigSettings(TypedDict):
    base_path: str
    audio_folder: str
    audio_host: str
    expected_sample_rate: int
    umap_seed: int
    autocluster: numpy.bool_
    autocluster_iterations: int
    autocluster_min_size: int
    autocluster_max_size: int
    autocluster_threshold: float
