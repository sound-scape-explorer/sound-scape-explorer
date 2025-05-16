from enum import Enum

import numpy as np

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.constants import MDM_EMPTY
from processing.context import Context
from processing.enums import StorageDomain
from processing.paths.PathRegistry import PathRegistry
from processing.storage.Storage import Storage
from processing.types import Mdm


class MeanDistancesMatrixPath(Enum):
    MDM = PathRegistry.register(StorageDomain.mean_distance_matrix)


class MeanDistancesMatrixRepository:
    @staticmethod
    def delete(storage: Storage):
        storage.delete(MeanDistancesMatrixPath.MDM.value)

    @staticmethod
    def exists(storage: Storage):
        return storage.exists(MeanDistancesMatrixPath.MDM.value)

    @staticmethod
    def _get_path(
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        return PathRegistry.build(
            MeanDistancesMatrixPath.MDM.value,
            extraction.index,
            band.index,
            integration.index,
        )

    @staticmethod
    def to_storage(
        storage: Storage,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        data: np.ndarray,
    ):
        path = MeanDistancesMatrixRepository._get_path(extraction, band, integration)

        storage.write(
            path=path,
            data=data,
        )

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        trim_half: bool = False,
    ) -> Mdm:
        path = MeanDistancesMatrixRepository._get_path(extraction, band, integration)
        does_exist = context.storage.exists(path)

        if not does_exist:
            return MDM_EMPTY

        dataset = context.storage.read(path)
        matrix: Mdm = np.array(dataset).astype(np.float32)

        if trim_half is True:
            np.fill_diagonal(matrix, 0)

        return matrix
