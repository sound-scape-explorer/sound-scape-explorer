from typing import List


class ConfigAutocluster:
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
        self.index = index
        self.name = name

        self.min_cluster_size = min_cluster_size
        self.min_samples = min_samples
        self.alpha = alpha
        self.epsilon = epsilon


ConfigAutoclusters = List[ConfigAutocluster]
