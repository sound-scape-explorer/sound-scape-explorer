from typing import Iterable, List

import umap.umap_
from h5py import Dataset

from processing.classes.NewStorage import NewStorage


class NewFeatureReducer:
    __storage: NewStorage = NewStorage()
    __files_range: Iterable = range(len(__storage.get_files()))
    __bands: Dataset = __storage.get_bands()
    __integrations: Dataset = __storage.get_integrations()

    def __init__(self):
        for band in self.__bands:
            for integration in self.__integrations:
                collected_features = self.__collect(band, integration)
                reduced_features = self.__reduce(collected_features)

                split_features = self.__split(reduced_features)

                for file_index in self.__files_range:
                    self.__storage.create_groups_reduced(
                        band=band,
                        integration=integration,
                        file_index=file_index,
                        features=split_features[file_index],
                    )

    def __split(
        self,
        flat_features: List[List[float]]
    ) -> List[List[List[float]]]:
        split_features = []
        flat_features_length = len(flat_features)
        files_length = len(self.__storage.get_files())

        if flat_features_length % files_length != 0:
            # TODO: Complete me
            raise ValueError('placeholder')

        features_per_file = flat_features_length / files_length
        features_per_file = int(features_per_file)

        for _ in self.__files_range:
            split_features.append([])

        for file_index in self.__files_range:
            start = features_per_file * file_index
            end = features_per_file * (file_index + 1)

            flat_features_slice = flat_features[start:end]

            for features in flat_features_slice:
                split_features[file_index].append(features)

        return split_features

    def __collect(
        self,
        band: str,
        integration: int,
    ) -> List[List[float]]:
        features: List[List[float]] = []

        for file_index in self.__files_range:
            groups_features = self.__storage.get_groups_features(
                band, integration, file_index
            )

            for group_features in groups_features:
                features.append(group_features)

        return features

    def __reduce(
        self,
        features: List[List[float]],
        target_dimensions: int = 2,
    ) -> List[List[float]]:
        umap_seed = self.__storage.get_umap_seed()

        umap_instance = umap.umap_.UMAP(
            random_state=umap_seed,
            n_components=target_dimensions,
        )

        reduced_features = umap_instance.fit_transform(features)

        return reduced_features
