from typing import List

from processing.lib.VAE_v1 import VAE
from processing.reducers.AbstractReducer import AbstractReducer


class VaeReducer(AbstractReducer):
    def calculate(
        self,
    ) -> List[List[float]]:
        features = self._validate_load()
        vae = VAE(n_components=self._dimensions)
        vae.fit(features)
        reduced_features = vae.transform(features)
        self.set_values(reduced_features)
        return self.values
