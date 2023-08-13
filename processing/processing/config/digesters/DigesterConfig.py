from typing import Dict, List, Type

from processing.digesters.Digester import Digester
from processing.digesters.SumVarianceDigester import SumVarianceDigester


class DigesterConfig:
    digesters: Dict[str, Type[Digester]] = {
        "sum_var": SumVarianceDigester,
        # "sum_std": None,
        # "mean_std": None,
        # "mean_spreading": None,
        # "distance": None,
        # "overlap": None,
        # "silhouette": None,
        # "contingency": None,
    }

    def __init__(
        self,
        index: int,
        name: str,
    ) -> None:
        self.validate_name(name=name)

        self.index = index
        self.name = name

    def validate_name(self, name: str) -> None:
        assert name in self.digesters.keys(), f"Unable to find digester name {name}"

    def instanciate(self) -> Digester:
        instance = self.digesters[self.name]()
        instance.index = self.index
        return instance

    @staticmethod
    def flatten(digesters: List["DigesterConfig"]) -> List[str]:
        names = [d.name for d in digesters]
        return names

    @staticmethod
    def reconstruct(names: List[str]) -> List["DigesterConfig"]:
        digesters = []

        for index, name in enumerate(names):
            digester = DigesterConfig(
                index=index,
                name=name,
            )

            digesters.append(digester)

        return digesters
