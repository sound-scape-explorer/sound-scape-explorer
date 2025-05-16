from enum import Enum

import numpy as np
from h5py import Dataset

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.context import Context
from processing.enums import StorageDomain
from processing.paths.path_registry import register_path, build_path
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixPath,
)


class ComputationPath(Enum):
    COMPUTED = register_path(StorageDomain.computations)


class ComputationRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ComputationPath.COMPUTED.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(
            ComputationPath.COMPUTED.value
        ) and context.storage.exists(MeanDistancesMatrixPath.MDM.value)

    @staticmethod
    def _get_path(
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        iteration: int,
    ):
        return build_path(
            ComputationPath.COMPUTED.value,
            extraction.index,
            band.index,
            integration.index,
            iteration,
        )

    @staticmethod
    def to_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        iteration: int,
        data: np.ndarray,
    ):
        path = ComputationRepository._get_path(extraction, band, integration, iteration)

        context.storage.write(
            path=path,
            data=data,
        )

    @staticmethod
    def from_storage(
        context: Context,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        all_computed: list[Dataset] = []

        for iteration in range(context.config.settings.computation_iterations):
            path = ComputationRepository._get_path(
                extraction, band, integration, iteration
            )
            computed = context.storage.read(path)
            all_computed.append(computed)

        return all_computed
