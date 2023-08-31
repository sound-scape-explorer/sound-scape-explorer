from typing import List

from sklearn.decomposition import SparsePCA

from processing.reducers.AbstractReducer import AbstractReducer


class SparsePcaReducer(AbstractReducer):
    def calculate(
        self,
    ) -> List[List[float]]:
        features = self._validate_load()

        sparse_pca = SparsePCA(
            n_components=self._dimensions,
            random_state=self._seed,
        )

        reduced_features = sparse_pca.fit_transform(features)
        self.set_values(list(reduced_features))
        return self.values
