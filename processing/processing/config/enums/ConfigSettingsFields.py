from enum import Enum


# TODO: Remove redundancy with `ConfigSettings`
class ConfigSettingsFields(Enum):
    umap_seed = 'umap_seed'
    expected_sample_rate = 'expected_sample_rate'
