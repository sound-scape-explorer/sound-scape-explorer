from enum import Enum


class StorageSetting(Enum):
    base_path = 'base_path'
    audio_folder = 'audio_folder'
    expected_sample_rate = 'expected_sample_rate'
    umap_seed = 'umap_seed'
    autocluster = 'autocluster'
