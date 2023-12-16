from typing import Dict, List, Tuple

from h5py import Dataset
from rich import print

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.utils.print_action import print_action


class AutoclusterConfig:
    methods_by_name: Dict[str, str] = {
        "hdbscan-eom": "eom",
        "hdbscan-leaf": "leaf",
    }

    none_string = "None"

    def __init__(
        self,
        index: int,
        name: str,
        min_cluster_size: int,
        min_samples: str,
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
        if name in AutoclusterConfig.methods_by_name.keys():
            return

        raise KeyError(f"Unable to validate autoclustering name {name}.")

    @staticmethod
    def flatten(
        autoclusters: List["AutoclusterConfig"],
    ) -> Tuple[List[str], List[int], List[str], List[float], List[float]]:
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
        min_samples: List[str],
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
    ):  # -> HDBSCAN
        from hdbscan import HDBSCAN

        self.band = band
        self.integration = integration

        method = self.methods_by_name[self.name]
        min_samples = (
            None if self.min_samples == self.none_string else int(self.min_samples)
        )

        self.instance = HDBSCAN(
            min_cluster_size=self.min_cluster_size,
            min_samples=min_samples,
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
        try:
            clustering = self.instance.fit(mean_distances_matrix[:])
            labels = clustering.labels_.tolist()
        except MemoryError:
            print_action(
                f"The mean distances matrix {mean_distances_matrix.shape} "
                f"exceeds the available RAM.",
                "warning",
            )
            print("Filling with dummy results to continue processing...")

            labels = ["MemoryError"] * mean_distances_matrix.shape[0]

        print(set(labels))
        self.values = labels
        return self.values
