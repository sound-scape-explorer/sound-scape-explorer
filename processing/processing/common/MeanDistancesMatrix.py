from typing import List

import numpy as np
from h5py import Dataset

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.constants import MDM_DEFAULT, MDM_SHAPE_LIMIT
from processing.errors.MeanDistancesMatrixOutOfMemoryWarning import (
    MeanDistancesMatrixOutOfMemoryWarning,
)
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class MeanDistancesMatrix:
    @staticmethod
    def calculate(
        features: List[Dataset],
    ) -> List[List[float]]:
        shape = len(features[0])

        if shape > MDM_SHAPE_LIMIT:
            MeanDistancesMatrixOutOfMemoryWarning("Filling storage with empty array...")
            return MDM_DEFAULT

        from sklearn import metrics

        mean_distances_matrix = np.zeros([shape, shape])

        for i in range(len(features)):
            previous_mean_distances_matrix = mean_distances_matrix

            umap = features[i]

            current_mean_distances_matrix = metrics.pairwise_distances(umap)

            mean_distances_matrix = (
                (previous_mean_distances_matrix * i) + current_mean_distances_matrix
            ) / (i + 1)

            return mean_distances_matrix.tolist()

    @staticmethod
    def read_from_storage(
        storage: Storage,
        band: BandConfig,
        integration: IntegrationConfig,
        trim_half: bool = False,
    ):
        path = MeanDistancesMatrix.get_path(band, integration)
        dataset = storage.read(path)
        matrix = np.array(dataset)

        if trim_half is True:
            np.fill_diagonal(matrix, 0)

        return matrix

    @staticmethod
    def get_path(
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> str:
        return (
            f"{StoragePath.mean_distances_matrix.value}"
            f"/{band.name}"
            f"/{integration.seconds}"
        )

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return storage.exists_dataset(StoragePath.mean_distances_matrix)
