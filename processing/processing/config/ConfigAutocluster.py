from typing import List

from processing.clusterings.ClusteringName import ClusteringName


class ConfigAutocluster:
    names = set(name.value for name in ClusteringName)

    index: int
    name: str
    min_cluster_size: int
    min_samples: int
    alpha: float
    epsilon: float

    def __init__(
        self,
        index: int,
        name: str,
        min_cluster_size: int,
        min_samples: int,
        alpha: float,
        epsilon: float,
    ) -> None:
        ConfigAutocluster.validate_name(name)

        self.index = index
        self.name = name
        self.min_cluster_size = min_cluster_size
        self.min_samples = min_samples
        self.alpha = alpha
        self.epsilon = epsilon

    @staticmethod
    def validate_name(name: str) -> None:
        """The validator for autoclustering names.

        Args:
            name: The autoclustering name to validate.

        Returns:
            None

        Raises:
            KeyError: An error occured because the clustering name has not been found.
        """
        if name in ConfigAutocluster.names:
            return

        raise KeyError(f"Unable to validate autoclustering name {name}.")

    @staticmethod
    def flatten(autoclusters: List["ConfigAutocluster"]):
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
    ) -> List["ConfigAutocluster"]:
        autoclusters = []

        for index, name in enumerate(names):
            autocluster = ConfigAutocluster(
                index=index,
                name=name,
                min_cluster_size=min_cluster_sizes[index],
                min_samples=min_samples[index],
                alpha=alphas[index],
                epsilon=epsilons[index],
            )

            autoclusters.append(autocluster)

        return autoclusters
