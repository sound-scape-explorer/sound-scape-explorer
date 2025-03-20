from typing import Any, List

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.extractors.Extractor import Extractor
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.StorageNew import StorageNew
from processing.storage.StoragePath import StoragePath


class AggregatedStorage:
    @staticmethod
    def delete(storage: StorageNew) -> None:
        storage.delete(StoragePath.aggregated.value)
        storage.delete(StoragePath.aggregated_sites.value)
        storage.delete(StoragePath.aggregated_interval_details.value)
        storage.delete(StoragePath.aggregated_timestamps.value)
        storage.delete(StoragePath.aggregated_labels.value)

    @staticmethod
    def exists(storage: StorageNew) -> bool:
        return (
            storage.exists(StoragePath.aggregated.value)
            and storage.exists(StoragePath.aggregated_sites.value)
            and storage.exists(StoragePath.aggregated_interval_details.value)
            and storage.exists(StoragePath.aggregated_timestamps.value)
            and storage.exists(StoragePath.aggregated_labels.value)
        )

    @staticmethod
    def get_data_path(
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ) -> str:
        return (
            f"/{StoragePath.aggregated.value}"
            f"/{band.index}"
            f"/{integration.index}"
            f"/{extractor.index}"
        )

    @staticmethod
    def append_data(
        storage: StorageNew,
        data: List[Any],
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ) -> None:
        path = AggregatedStorage.get_data_path(
            band=band,
            integration=integration,
            extractor=extractor,
        )

        storage.append(
            path=path,
            data=[data],
            attributes={
                "extractor": extractor.__class__.__name__,
                "offset": str(extractor.offset),
                "step": str(extractor.step),
                "method": "for step in file in site",
            },
        )

    @staticmethod
    def get_site_path(
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ) -> str:
        return (
            f"/{StoragePath.aggregated_sites.value}"
            f"/{band.index}"
            f"/{integration.index}"
            f"/{extractor.index}"
        )

    @staticmethod
    def append_site(
        storage: StorageNew,
        site: str,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
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
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ) -> str:
        return (
            f"/{StoragePath.aggregated_interval_details.value}"
            f"/{band.index}"
            f"/{integration.index}"
            f"/{extractor.index}"
        )

    @staticmethod
    def append_interval_details(
        storage: StorageNew,
        interval_details: List[str],
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
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
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ) -> str:
        return (
            f"/{StoragePath.aggregated_timestamps.value}"
            f"/{band.index}"
            f"/{integration.index}"
            f"/{extractor.index}"
        )

    # INFO: This stores duplicated data as timestamps are the same for
    # band and extractor given a single integration
    @staticmethod
    def append_timestamp(
        storage: StorageNew,
        timestamp: int,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
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
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ) -> str:
        return (
            f"/{StoragePath.aggregated_labels.value}"
            f"/{band.index}"
            f"/{integration.index}"
            f"/{extractor.index}"
        )

    @staticmethod
    def append_labels(
        storage: StorageNew,
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
