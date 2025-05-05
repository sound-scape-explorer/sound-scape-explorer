from dataclasses import dataclass

from processing.dtos import AutoclusterDto
from processing.enums import AutoclusterImplEnum
from processing.errors.MeanDistancesMatrixOutOfMemoryWarning import (
    MeanDistancesMatrixOutOfMemoryWarning,
)
from processing.types import Mdm, Autoclustered


@dataclass
class AutoclusterConfig:
    index: int
    name: str
    impl: AutoclusterImplEnum
    min_cluster_size: int
    min_samples: int
    alpha: float
    epsilon: float

    none_string = "None"

    @classmethod
    def from_dto(cls, dto: AutoclusterDto):
        name = f"{dto.index}_{dto.impl.name}"

        return cls(
            index=dto.index,
            name=name,
            impl=dto.impl,
            min_cluster_size=dto.minClusterSize,
            min_samples=dto.minSamples,
            alpha=dto.alpha,
            epsilon=dto.epsilon,
        )

    def _start(self):
        from sklearn.cluster import HDBSCAN

        if self.impl is AutoclusterImplEnum.HDBSCAN_EOM:
            method = "eom"
        elif self.impl is AutoclusterImplEnum.HDBSCAN_LEAF:
            method = "leaf"
        else:
            raise Exception(f"Unknown autocluster implementation: {self.impl}")

        min_samples = (
            None if self.min_samples == self.none_string else int(self.min_samples)
        )

        return HDBSCAN(
            min_cluster_size=self.min_cluster_size,
            min_samples=min_samples,
            alpha=self.alpha,
            cluster_selection_epsilon=self.epsilon,
            cluster_selection_method=method,
            metric="precomputed",
            # p=None,
            # algorithm="best",
            algorithm="auto",
            leaf_size=50,
            n_jobs=-1,
            # approx_min_span_tree=True,
            # gen_min_span_tree=False,
            # core_dist_n_jobs=-1,
            # match_reference_implementation=False,
        )

    def run(self, mean_distances_matrix: Mdm) -> Autoclustered:
        try:
            ac = self._start()
            clustering = ac.fit(mean_distances_matrix[:])
            # noinspection PyUnresolvedReferences
            labels: list[int] = clustering.labels_.tolist()
        except MemoryError:
            MeanDistancesMatrixOutOfMemoryWarning(
                f"{mean_distances_matrix.shape}",
                "Filling storage with dummy results...",
            )

            labels = [-1] * mean_distances_matrix.shape[0]

        return labels
