from enum import Enum

import numpy as np
from h5py import Dataset

from processing.constants import MDM_DEFAULT
from processing.errors.MeanDistancesMatrixOutOfMemoryWarning import (
    MeanDistancesMatrixOutOfMemoryWarning,
)
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.SettingsConfigNew import SettingsConfigNew
from processing.new.StorageNew import StorageNew
from processing.new.paths import register_path, build_path
from processing.utils.calculate_mdm_shape_limit import calculate_mdm_shape_limit


class MeanDistancesMatrixPath(Enum):
    mean_distances_matrix = register_path("mean_distances_matrix")


class MeanDistancesMatrixManager:
    # TODO: refactor me, pass the context only but circular imports for now
    @staticmethod
    def delete(storage: StorageNew):
        storage.delete(MeanDistancesMatrixPath.mean_distances_matrix.value)

    # TODO: refactor me, pass the context only but circular imports for now
    @staticmethod
    def exists(storage: StorageNew):
        return storage.exists(MeanDistancesMatrixPath.mean_distances_matrix.value)

    @staticmethod
    def _get_path(
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ):
        return build_path(
            MeanDistancesMatrixPath.mean_distances_matrix.value,
            band.index,
            integration.index,
            extractor.index,
        )

    @staticmethod
    def calculate(
        features: list[Dataset],
        settings: SettingsConfigNew,
    ) -> list[list[float]]:
        shape_req = len(features[0])
        shape_max = calculate_mdm_shape_limit(settings.memory_limit)

        if shape_req > shape_max:
            MeanDistancesMatrixOutOfMemoryWarning(
                "Filling storage with empty array...",
                f"RAM limit: {settings.memory_limit} GB",
            )
            return MDM_DEFAULT

        from sklearn import metrics

        values: list[list[float]] = []
        samples_count = features[0].shape[0]
        mdm = np.zeros([samples_count, samples_count])

        for i in range(len(features)):
            previous_mdm = mdm
            selected = features[i]
            current_mdm = metrics.pairwise_distances(selected)
            mdm = ((previous_mdm * i) + current_mdm) / (i + 1)
            values = mdm.tolist()

        return values

    @staticmethod
    def to_storage(
        storage: StorageNew,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
        data: list[list[float]],
    ):
        path = MeanDistancesMatrixManager._get_path(band, integration, extractor)

        storage.write(
            path=path,
            data=data,
        )

    @staticmethod
    def from_storage(
        storage: StorageNew,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
        trim_half: bool = False,
    ):
        path = MeanDistancesMatrixManager._get_path(band, integration, extractor)
        dataset = storage.read(path)
        matrix = np.array(dataset)

        if trim_half is True:
            np.fill_diagonal(matrix, 0)

        return matrix
