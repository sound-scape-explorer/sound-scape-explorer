import os

import numpy as np

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.settings.SettingsConfig import SettingsConfig
from processing.config.settings.SettingsDefaults import SettingsDefaults
from processing.config.settings.SettingsRow import SettingsRow
from processing.config.settings.SettingsSheet import SettingsSheet
from processing.constants import STRING_NONE
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.is_nan import is_nan


class SettingsStorage:
    settings = StoragePath.settings.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(SettingsStorage.settings)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(SettingsStorage.settings)

    @staticmethod
    def read_from_storage(storage: Storage) -> SettingsConfig:
        dataset = storage.read(SettingsStorage.settings)
        attributes = dataset.attrs

        storage_path: str = attributes[SettingsRow.storage_path.value]  # type: ignore
        audio_path: str = attributes[SettingsRow.audio_path.value]  # type: ignore
        audio_host: str = attributes[SettingsRow.audio_host.value]  # type: ignore
        expected_sample_rate: int = attributes[
            SettingsRow.expected_sample_rate.value
        ]  # type: ignore
        timeline_origin: int = attributes[
            SettingsRow.timeline_origin.value
        ]  # type: ignore
        timezone: str = attributes[SettingsRow.timezone.value]  # type: ignore
        c_umap_dimensions: int = attributes[
            SettingsRow.c_umap_dimensions.value
        ]  # type: ignore
        c_umap_iterations: int = attributes[
            SettingsRow.c_umap_iterations.value
        ]  # type: ignore
        display_umap_seed: int = attributes[
            SettingsRow.display_umap_seed.value
        ]  # type: ignore

        settings = SettingsConfig(
            storage_path=storage_path,
            audio_path=audio_path,
            audio_host=audio_host,
            expected_sample_rate=expected_sample_rate,
            timeline_origin=timeline_origin,
            timezone=timezone,
            computation_umap_dimensions=c_umap_dimensions,
            computation_umap_iterations=c_umap_iterations,
            display_umap_seed=display_umap_seed,
        )

        return settings

    @staticmethod
    def read_from_config(parser: ConfigParser) -> SettingsConfig:
        sheet = ExcelSheet.settings

        properties = parser.get(sheet, SettingsSheet.setting)
        values = parser.get(sheet, SettingsSheet.value_)

        obj = {}

        for property, value in zip(properties, values):
            obj[property] = value

        storage_path = obj[SettingsRow.storage_path.value]

        if not os.path.isabs(storage_path):
            storage_path = os.path.join(parser.folder, storage_path)

        audio_path = obj[SettingsRow.audio_path.value]

        if not os.path.isabs(audio_path):
            audio_path = os.path.join(parser.folder, audio_path)

        audio_host = obj[SettingsRow.audio_host.value]

        if is_nan(audio_host):
            audio_host = SettingsDefaults.audio_host

        expected_sample_rate = obj[SettingsRow.expected_sample_rate.value]

        timeline_origin = (
            int(obj[SettingsRow.timeline_origin.value].timestamp()) * 1000
        )  # milliseconds

        timezone = (
            obj[SettingsRow.timezone.value]
            if obj[SettingsRow.timezone.value] is not np.nan
            else SettingsDefaults.timezone
        )

        computation_umap_dimensions = (
            obj[SettingsRow.c_umap_dimensions.value]
            if obj[SettingsRow.c_umap_dimensions.value] is not np.nan
            else SettingsDefaults.computation_umap_dimensions
        )

        computation_umap_iterations = (
            obj[SettingsRow.c_umap_iterations.value]
            if obj[SettingsRow.c_umap_iterations.value] is not np.nan
            else SettingsDefaults.computation_umap_iterations
        )

        display_umap_seed = (
            obj[SettingsRow.display_umap_seed.value]
            if obj[SettingsRow.display_umap_seed.value] is not np.nan
            else SettingsDefaults.display_umap_seed
        )

        settings = SettingsConfig(
            storage_path=storage_path,
            audio_path=audio_path,
            audio_host=audio_host,
            expected_sample_rate=expected_sample_rate,
            timeline_origin=timeline_origin,
            timezone=timezone,
            computation_umap_dimensions=computation_umap_dimensions,
            computation_umap_iterations=computation_umap_iterations,
            display_umap_seed=display_umap_seed,
        )

        return settings

    @staticmethod
    def write_to_storage(settings: SettingsConfig, storage: Storage) -> None:
        storage.write_empty_group(SettingsStorage.settings)

        for k, v in vars(settings).items():
            storage.create_attribute(
                path=SettingsStorage.settings,
                key=k,
                value=v if v is not None else STRING_NONE,
            )
