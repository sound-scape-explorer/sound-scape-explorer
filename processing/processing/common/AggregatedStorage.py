from typing import Any, List

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.extractors.Extractor import Extractor
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class AggregatedStorage:
    @staticmethod
    def delete(storage: Storage) -> None:
        storage.delete(StoragePath.aggregated)
        storage.delete(StoragePath.aggregated_sites)
        storage.delete(StoragePath.aggregated_interval_details)
        storage.delete(StoragePath.aggregated_timestamps)
        storage.delete(StoragePath.aggregated_labels)

    @staticmethod
    def exists(storage: Storage) -> bool:
        return (
            storage.exists_dataset(StoragePath.aggregated)
            and storage.exists_dataset(StoragePath.aggregated_sites)
            and storage.exists_dataset(StoragePath.aggregated_interval_details)
            and storage.exists_dataset(StoragePath.aggregated_timestamps)
            and storage.exists_dataset(StoragePath.aggregated_labels)
        )

    @staticmethod
    def get_data_path(
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> str:
        return (
            f"/{StoragePath.aggregated.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

    @staticmethod
    def append_data(
        storage: Storage,
        data: List[Any],
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> None:
        path = AggregatedStorage.get_data_path(
            band=band,
            integration=integration,
            extractor=extractor,
        )

        storage.append(
            path=path,
            data=[data],
            compression=True,
            attributes={
                "extractor": extractor.__class__.__name__,
                "offset": str(extractor.offset),
                "step": str(extractor.step),
                "method": "for step in file in site",
            },
        )

    @staticmethod
    def get_site_path(
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> str:
        return (
            f"/{StoragePath.aggregated_sites.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

    @staticmethod
    def append_site(
        storage: Storage,
        site: str,
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> None:
        path = AggregatedStorage.get_site_path(
            band=band,
            integration=integration,
            extractor=extractor,
        )

        storage.append(
            path=path,
            data=[[site]],
        )

    @staticmethod
    def get_interval_details_path(
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> str:
        return (
            f"/{StoragePath.aggregated_interval_details.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

    @staticmethod
    def append_interval_details(
        storage: Storage,
        interval_details: List[str],
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> None:
        path = AggregatedStorage.get_interval_details_path(
            band=band,
            integration=integration,
            extractor=extractor,
        )

        storage.append(
            path=path,
            data=[interval_details],
            attributes={
                "description": "Each column is {block_start}"
                "/{relative_file_start}/{file_path}",
            },
        )

    @staticmethod
    def get_timestamp_path(
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> str:
        return (
            f"/{StoragePath.aggregated_timestamps.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

    # INFO: This stores duplicated data as timestamps are the same for
    # band and extractor given a single integration
    @staticmethod
    def append_timestamp(
        storage: Storage,
        timestamp: int,
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> None:
        path = AggregatedStorage.get_timestamp_path(
            band=band,
            integration=integration,
            extractor=extractor,
        )

        storage.append(
            path=path,
            data=[[timestamp]],
        )

    @staticmethod
    def get_labels_path(
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> str:
        return (
            f"/{StoragePath.aggregated_labels.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
            f"/{extractor.index}"
        )

    @staticmethod
    def append_labels(
        storage: Storage,
        labels: List[str],
        band: BandConfig,
        integration: IntegrationConfig,
        extractor: Extractor,
    ) -> None:
        path = AggregatedStorage.get_labels_path(
            band=band,
            integration=integration,
            extractor=extractor,
        )

        storage.append(
            path=path,
            data=[labels],
        )
