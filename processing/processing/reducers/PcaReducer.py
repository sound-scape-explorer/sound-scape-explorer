from sklearn.decomposition import PCA
from sklearn.preprocessing import scale

from processing.reducers.AbstractReducer import AbstractReducer


class PcaReducer(AbstractReducer):
    def _reduce(
        self,
        embeddings,
        dimensions,
        seed,
    ):
        pca = PCA(
            n_components=dimensions,
            random_state=seed,
        )

        scaled = scale(embeddings)
        reductions = pca.fit_transform(scaled)
        return reductions
