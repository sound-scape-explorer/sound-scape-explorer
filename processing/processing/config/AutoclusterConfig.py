from typing import Dict, List, Tuple

from h5py import Dataset
from hdbscan import HDBSCAN

from processing.config.BandConfig import BandConfig
from processing.config.IntegrationConfig import IntegrationConfig


class AutoclusterConfig:
    methodsByName: Dict[str, str] = {
        "hdbscan-eom": "eom",
        "hdbscan-leaf": "leaf",
    }

    index: int
    name: str
    min_cluster_size: int
    min_samples: int
    alpha: float
    epsilon: float
    band: BandConfig
    integration: IntegrationConfig
    instance: HDBSCAN
    values: List[int]

    def __init__(
        self,
        index: int,
        name: str,
        min_cluster_size: int,
        min_samples: int,
        alpha: float,
        epsilon: float,
    ) -> None:
        AutoclusterConfig.validate_name(name)

        self.index = index
        self.name = name
        self.min_cluster_size = min_cluster_size
        self.min_samples = min_samples
        self.alpha = float(alpha)
        self.epsilon = float(epsilon)

    @staticmethod
    def validate_name(name: str) -> None:
        """The validator for autoclustering names.

        Args:
            name: The autoclustering name to validate.

        Returns:
            None

        Raises:
            KeyError: An error occured because the autoclustering name
            has not been found.
        """
        if name in AutoclusterConfig.methodsByName.keys():
            return

        raise KeyError(f"Unable to validate autoclustering name {name}.")

    @staticmethod
    def flatten(
        autoclusters: List["AutoclusterConfig"],
    ) -> Tuple[List[str], List[int], List[int], List[float], List[float]]:
        names = [ac.name for ac in autoclusters]
        min_cluster_sizes = [ac.min_cluster_size for ac in autoclusters]
        min_samples = [ac.min_samples for ac in autoclusters]
        alphas = [ac.alpha for ac in autoclusters]
        epsilons = [ac.epsilon for ac in autoclusters]

        return names, min_cluster_sizes, min_samples, alphas, epsilons

    @staticmethod
    def reconstruct(
        names: List[str],
        min_cluster_sizes: List[int],
        min_samples: List[int],
        alphas: List[float],
        epsilons: List[float],
    ) -> List["AutoclusterConfig"]:
        autoclusters = []

        for index, name in enumerate(names):
            autocluster = AutoclusterConfig(
                index=index,
                name=name,
                min_cluster_size=min_cluster_sizes[index],
                min_samples=min_samples[index],
                alpha=alphas[index],
                epsilon=epsilons[index],
            )

            autoclusters.append(autocluster)

        return autoclusters

    def create_instance(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> HDBSCAN:
        self.band = band
        self.integration = integration

        method = self.methodsByName[self.name]

        self.instance = HDBSCAN(
            min_cluster_size=self.min_cluster_size,
            min_samples=self.min_samples,
            alpha=self.alpha,
            cluster_selection_epsilon=self.epsilon,
            cluster_selection_method=method,
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
    ) -> List[str]:
        clustering = self.instance.fit(mean_distances_matrix[:])
        labels = clustering.labels_.tolist()
        self.values = labels
        return self.values
