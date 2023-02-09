from typing import List

import umap.umap_

from processing.classes.NewExtractor import Features
from processing.classes.NewStorage import NewStorage


class NewFeatureReducer:
    __storage: NewStorage = NewStorage()
    __bands: List[str] = __storage.get_bands()
    __integrations: List[int] = __storage.get_integrations()
    __umaps: List[str] = __storage.get_umaps()
    __sites: List[str] = __storage.get_sites()

    def __init__(self):
        self.__test()

    def __test(self):
        for site in self.__sites:
            for band in self.__bands:
                for integration in self.__integrations:
                    print(site, band, integration)

    def __collect_features(self):
        pass

    def __run(self):
        pass

    def __store(self):
        pass

    def __reduce_dimensions(
        self,
        features: Features,
        target_dimensions: int = 2,
    ) -> List[float]:
        umap_seed = self.__storage.get_umap_seed()

        umap_instance = umap.umap_.UMAP(
            random_state=umap_seed,
            n_components=target_dimensions,
        )

        reduced_features = umap_instance.fit_transform(features)

        return reduced_features
