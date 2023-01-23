from typing import TypedDict


class ConfigVariablesInterface(TypedDict):
    audio_base: str
    audio_base_cluster: str
    audio_expected_sample_rate: str
    audio_suffix: str
    feature_base: str
    generated_base: str
    other_base: str
    preview_file: str
    preview_file_start: str
    preview_file_dur: str
    display_in_utc_plus: str
    display_locale: str
    integration_seconds: str
    nearest_radiuses: str
    umap_random: str
