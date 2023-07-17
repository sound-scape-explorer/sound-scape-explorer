from typing import Any, List, Optional

import numpy
import sklearn.metrics as metrics
from h5py import Dataset
from hdbscan import HDBSCAN
from sklearn.preprocessing import LabelEncoder

from processing.common.Timer import Timer
from processing.reducers.UmapReducer import UmapReducer
from processing.utils.print_new_line import print_new_line


# TODO: This is unused
class AutoConsensusClustering:
    __features: List[List[float]]
    __iterations: int
    __metric: str
    __min_cluster_size: int
    __max_cluster_size: int
    __cluster_range: range
    __best_clusters_to_keep: int
    __score: Any
    __separation_matrix: Any
    __separation_matrix_count: int
    __threshold: float
    __timer: Timer

    def __init__(
        self,
        features: Dataset,
        iterations: int = 10,
        metric: str = "manhattan",
        min_cluster_size: int = 40,
        max_cluster_size: Optional[int] = None,
        best_clusters_to_keep: int = 10,
        threshold: float = 1.0,
    ) -> None:
        self.__features = [dataset[:] for dataset in features]
        self.__iterations = iterations
        self.__metric = metric

        self.__min_cluster_size = min_cluster_size

        if max_cluster_size is None:
            self.__max_cluster_size = self.__min_cluster_size + 1
        else:
            self.__max_cluster_size = max_cluster_size

        self.__cluster_range = range(
            self.__min_cluster_size,
            self.__max_cluster_size + 1,
        )

        self.__best_clusters_to_keep = best_clusters_to_keep
        self.__score = []

        n_samples = numpy.array(features).shape[0]
        self.__separation_matrix = numpy.zeros([n_samples, n_samples])
        self.__separation_matrix_count = 0
        self.__threshold = threshold
        self.__timer = Timer(self.__iterations)

        self.__print_loaded()

    def __print_loaded(self) -> None:
        print_new_line()

        print(
            f"AutoConsensusClustering loaded with"
            f" {self.__iterations} iterations,"
            f" cluster {self.__cluster_range},"
            f" threshold: {self.__threshold}"
        )

    def __run(self) -> None:
        for _ in range(self.__iterations):
            reducer = UmapReducer(
                target_dimensions=10,
                seed=None,
            )
            features = reducer.reduce(self.__features)
            self.__scan(features)
            self.__timer.progress()

    def __scan(self, features: List[List[float]]) -> None:
        clustering_bests = []
        clustering_labels = []
        clustering_probabilities = []

        for j in self.__cluster_range:
            clustering = HDBSCAN(
                metric=self.__metric,
                min_cluster_size=j,
                gen_min_span_tree=True,
            )

            clustering.fit(features)

            clustering_bests.append(clustering.relative_validity_)
            clustering_labels.append(clustering.labels_)
            clustering_probabilities.append(clustering.probabilities_)

        # select

        # TODO: The following two blocks can be improved because they will
        #  fail if `clustering_scores` is not initialized. Also,
        #  `clustering_best_id` is not used within the first if statement.

        clustering_scores = []

        if len(clustering_bests) == 1:
            clustering_best_id = 0
            clustering_labels = [clustering_labels[0]]
            clustering_probabilities = [clustering_probabilities[0]]
        else:
            bctk = self.__best_clusters_to_keep
            clustering_best_id = numpy.argsort(clustering_bests)[-bctk:]

            clustering_labels = numpy.array(clustering_labels)[clustering_best_id]

            clustering_probabilities = numpy.array(clustering_probabilities)[
                clustering_best_id
            ]

            clustering_scores = numpy.array(clustering_bests)[clustering_best_id]

        for label, _, score in zip(  # type: ignore
            clustering_labels,
            clustering_probabilities,
            clustering_scores,
        ):
            # storing the best clusters scores
            self.__score.append(score)

            # change not clustered samples to individual clusters
            solo_id = numpy.where(label == -1)[0]
            solo_cluster = numpy.arange(-len(solo_id), 0)
            label[solo_id] = solo_cluster

            # separation matrix (not exactly a distance matrix ,even if the name
            # here is distMat, because each times a sample is 'distant' from
            # another, whatever the distance is, then it should be considered as
            # separated : i.e. 1 = different cluster / 0 = same cluster
            separation_matrix = metrics.pairwise_distances(
                label.reshape(-1, 1), label.reshape(-1, 1), metric="l1"
            )
            separation_matrix[separation_matrix != 0] = 1

            # TODO: Add consensus soft case

            # global
            self.__separation_matrix += separation_matrix
            self.__separation_matrix_count += 1

    def __make_consensus(self) -> List[int]:
        ratio = self.__separation_matrix / self.__separation_matrix_count
        self.__separation_matrix = 1 - ratio

        self.__separation_matrix[self.__separation_matrix >= self.__threshold] = 1
        self.__separation_matrix[self.__separation_matrix < self.__threshold] = 0

        unique: numpy.ndarray
        inverse: numpy.ndarray
        count: numpy.ndarray

        unique, inverse, count = numpy.unique(
            numpy.argmax(self.__separation_matrix, axis=1),
            return_index=False,
            return_inverse=True,
            return_counts=True,
        )

        unique[count < self.__min_cluster_size] = -1

        le = LabelEncoder()
        le.fit(unique)

        unique[count >= self.__min_cluster_size] = (
            le.transform(unique[count >= self.__min_cluster_size]) - 1
        )

        consensus: numpy.ndarray = unique[inverse].astype(str)
        consensus_list: List[int] = [int(value) for value in consensus]

        return consensus_list

    def get_consensus(self) -> List[int]:
        self.__run()
        consensus = self.__make_consensus()

        return consensus

    def get_score(self) -> float:
        mean_score = numpy.mean(self.__score)
        return float(mean_score)
