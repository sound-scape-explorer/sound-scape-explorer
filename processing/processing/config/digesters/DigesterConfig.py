from typing import Dict, List, Type

from processing.digesters.ContingencyDigester import ContingencyDigester
from processing.digesters.Digester import Digester
from processing.digesters.DistanceDigester import DistanceDigester
from processing.digesters.MeanSpreadingDigester import MeanSpreadingDigester
from processing.digesters.MeanStandardDeviationDigester import (
    MeanStandardDeviationDigester,
)
from processing.digesters.OverlapDigester import OverlapDigester
from processing.digesters.SilhouetteDigester import SilhouetteDigester
from processing.digesters.SumStandardDeviationDigester import (
    SumStandardDeviationDigester,
)
from processing.digesters.SumVarianceDigester import SumVarianceDigester


class DigesterConfig:
    digesters: Dict[str, Type[Digester]] = {
        "sum_var": SumVarianceDigester,
        "sum_std": SumStandardDeviationDigester,
        "mean_std": MeanStandardDeviationDigester,
        "mean_spreading": MeanSpreadingDigester,
        "distance": DistanceDigester,
        "overlap": OverlapDigester,
        "silhouette": SilhouetteDigester,
        "contingency": ContingencyDigester,
    }

    pairings = ["contingency"]

    def __init__(
        self,
        index: int,
        name: str,
    ) -> None:
        self.validate_name(name=name)

        self.index = index
        self.name = name

        self.is_pairing = True if self.name in self.pairings else False

    def validate_name(self, name: str) -> None:
        keys = self.digesters.keys()
        assert name in keys, f"Unable to find digester name {name}"

    def instantiate(self) -> Digester:
        instance = self.digesters[self.name]()
        instance.index = self.index
        instance.is_pairing = self.is_pairing
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
