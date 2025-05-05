from sklearn.decomposition import PCA
from sklearn.preprocessing import scale

from processing.reducers.AbstractReducerNew import AbstractReducerNew


class PcaReducerNew(AbstractReducerNew):
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
        reduced = pca.fit_transform(scaled)

        return reduced
