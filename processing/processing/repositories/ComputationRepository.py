from enum import Enum

import numpy as np
from h5py import Dataset

from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.context import Context
from processing.enums import StorageDomain
from processing.paths.PathRegistry import PathRegistry
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixPath,
)


class ComputationPath(Enum):
    COMPUTATIONS = PathRegistry.register(StorageDomain.computations)


class ComputationRepository:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(ComputationPath.COMPUTATIONS.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(
            ComputationPath.COMPUTATIONS.value
        ) and context.storage.exists(MeanDistancesMatrixPath.MDM.value)

    @staticmethod
    def _get_path(
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
        iteration: int,
    ):
        return PathRegistry.build(
            ComputationPath.COMPUTATIONS.value,
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
        computations: list[Dataset] = []
        iterations = context.config.get_computation_iterations()

        for iteration in range(iterations):
            path = ComputationRepository._get_path(
                extraction, band, integration, iteration
            )
            computation = context.storage.read(path)
            computations.append(computation)

        return computations
