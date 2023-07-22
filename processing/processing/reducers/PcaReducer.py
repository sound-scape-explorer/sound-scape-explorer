from typing import List

from sklearn.decomposition import PCA
from sklearn.preprocessing import scale

from processing.reducers.AbstractReducer import AbstractReducer


class PcaReducer(AbstractReducer):
    def calculate(self) -> List[List[float]]:
        features = self._validate_load()

        scaled_features = scale(features)

        pca = PCA(
            n_components=self._dimensions,
            random_state=self._seed,
        )

        reduced_features = pca.fit_transform(scaled_features)

        self.set_values(list(reduced_features))

        return self.values
