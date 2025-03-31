from dataclasses import dataclass
from enum import Enum

from h5py import Dataset
from hdbscan import HDBSCAN

from processing.dtos import AutoclusterDto
from processing.errors.MeanDistancesMatrixOutOfMemoryWarning import (
    MeanDistancesMatrixOutOfMemoryWarning,
)


class AutoclusterImpl(Enum):
    hdbscan_eom = "eom"
    hdbscan_leaf = "leaf"


@dataclass
class AutoclusterConfigNew:
    index: int
    name: str
    impl: AutoclusterImpl
    min_cluster_size: int
    min_samples: int
    alpha: float
    epsilon: float

    none_string = "None"

    instance: HDBSCAN = None
    values: list[str] = list

    @classmethod
    def from_dto(cls, dto: AutoclusterDto):
        impl = AutoclusterImpl[dto.impl.value]
        name = f"{dto.index}_{impl.name}"

        return cls(
            index=dto.index,
            name=name,
            impl=impl,
            min_cluster_size=dto.minClusterSize,
            min_samples=dto.minSamples,
            alpha=dto.alpha,
            epsilon=dto.epsilon,
        )

    def start(
        self,
    ):
        from hdbscan import HDBSCAN

        min_samples = (
            None if self.min_samples == self.none_string else int(self.min_samples)
        )

        self.instance = HDBSCAN(
            min_cluster_size=self.min_cluster_size,
            min_samples=min_samples,
            alpha=self.alpha,
            cluster_selection_epsilon=self.epsilon,
            cluster_selection_method=self.impl.value,
            metric="precomputed",
            p=None,
            algorithm="best",
            leaf_size=50,
            approx_min_span_tree=True,
            gen_min_span_tree=False,
            core_dist_n_jobs=-1,
            match_reference_implementation=False,
        )

        return self.instance

    def calculate(
        self,
        mean_distances_matrix: Dataset,
    ) -> list[str]:
        try:
            clustering = self.instance.fit(mean_distances_matrix[:])
            # noinspection PyUnresolvedReferences
            labels: list[str] = clustering.labels_.tolist()
        except MemoryError:
            MeanDistancesMatrixOutOfMemoryWarning(
                f"{mean_distances_matrix.shape}",
                "Filling storage with dummy results...",
            )

            labels = ["MemoryError"] * mean_distances_matrix.shape[0]

        self.values = labels
        return self.values
