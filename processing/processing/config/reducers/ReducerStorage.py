from typing import List

from processing.config.bands.BandConfig import BandConfig
from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.config.ranges.RangeConfig import RangeConfig
from processing.config.reducers.ReducerConfig import ReducerConfig
from processing.config.reducers.ReducerExcel import ReducerExcel
from processing.constants import STRING_NONE
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.is_nan import is_nan


class ReducerStorage:
    names = StoragePath.reducers_names.value
    dimensions = StoragePath.reducers_dimensions.value
    ranges = StoragePath.reducers_ranges.value
    bands = StoragePath.reducers_bands.value
    integrations = StoragePath.reducers_integrations.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(ReducerStorage.names)
        storage.delete(ReducerStorage.dimensions)
        storage.delete(ReducerStorage.ranges)
        storage.delete(ReducerStorage.bands)
        storage.delete(ReducerStorage.integrations)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return (
            storage.exists_dataset(ReducerStorage.names)
            and storage.exists_dataset(ReducerStorage.dimensions)
            and storage.exists_dataset(ReducerStorage.ranges)
            and storage.exists_dataset(ReducerStorage.bands)
            and storage.exists_dataset(ReducerStorage.integrations)
        )

    @staticmethod
    def read_from_storage(
        storage: Storage,
        bands: List[BandConfig],
        integrations: List[IntegrationConfig],
        ranges: List[RangeConfig],
    ) -> List[ReducerConfig]:
        names_dataset = storage.read(ReducerStorage.names)

        names = storage.convert_dataset_to_string_list(names_dataset)
        dimensions = storage.read(ReducerStorage.dimensions)[:]

        bands_names = storage.read(ReducerStorage.bands).asstr()
        integrations_names = storage.read(ReducerStorage.integrations).asstr()
        ranges_names = storage.read(ReducerStorage.ranges).asstr()

        bands_names = storage.trim_rectangular(bands_names, STRING_NONE)
        integrations_names = storage.trim_rectangular(integrations_names, STRING_NONE)
        ranges_names = storage.trim_rectangular(ranges_names, STRING_NONE)

        bands_names_strings = [
            ",".join(bands_names_string) for bands_names_string in bands_names
        ]

        integrations_names_strings = [
            ",".join(integrations_names_string)
            for integrations_names_string in integrations_names
        ]

        ranges_names_strings = [
            ",".join(ranges_names_string) for ranges_names_string in integrations_names
        ]

        reducers = ReducerConfig.reconstruct(
            names=names,
            dimensions=dimensions,
            bands_names_strings=bands_names_strings,
            integrations_names_strings=integrations_names_strings,
            ranges_names_strings=ranges_names_strings,
            bands=bands,
            integrations=integrations,
            ranges=ranges,
        )

        return reducers

    @staticmethod
    def read_from_config(
        parser: ConfigParser,
        bands: List[BandConfig],
        integrations: List[IntegrationConfig],
        ranges: List[RangeConfig],
    ) -> List[ReducerConfig]:
        sheet = ExcelSheet.reducers

        names = parser.get(sheet, ReducerExcel.name_)
        dimensions = parser.get(sheet, ReducerExcel.dimensions)

        for d in dimensions:
            assert is_nan(d) is False, f"{d} is not a valid dimension"

        bands_names_string = parser.get(sheet, ReducerExcel.bands)

        integrations_names_string = parser.get(
            sheet,
            ReducerExcel.integrations,
        )

        ranges_names_strings = parser.get(sheet, ReducerExcel.ranges)

        reducers = ReducerConfig.reconstruct(
            names=names,
            dimensions=dimensions,
            bands_names_strings=bands_names_string,
            integrations_names_strings=integrations_names_string,
            ranges_names_strings=ranges_names_strings,
            bands=bands,
            integrations=integrations,
            ranges=ranges,
        )

        return reducers

    @staticmethod
    def write_to_storage(reducers: List[ReducerConfig], storage: Storage) -> None:
        (
            names,
            dimensions,
            bands,
            integrations,
            ranges,
        ) = ReducerConfig.flatten(reducers=reducers)

        if len(bands) != 0:
            bands = storage.make_rectangular(bands, "")

        if len(integrations) != 0:
            integrations = storage.make_rectangular(integrations, "")

        if len(ranges) != 0:
            ranges = storage.make_rectangular(ranges, "")

        storage.write(path=ReducerStorage.names, data=names)
        storage.write(path=ReducerStorage.dimensions, data=dimensions)
        storage.write(path=ReducerStorage.bands, data=bands)
        storage.write(path=ReducerStorage.integrations, data=integrations)
        storage.write(path=ReducerStorage.ranges, data=ranges)
