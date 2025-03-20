from dataclasses import dataclass
from enum import Enum

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
from processing.dtos import DigesterDto


class DigesterImpl(Enum):
    sum_var = SumVarianceDigester
    sum_std = SumStandardDeviationDigester
    mean_std = MeanStandardDeviationDigester
    mean_spreading = MeanSpreadingDigester
    distance = DistanceDigester
    overlap = OverlapDigester
    silhouette = SilhouetteDigester
    contingency = ContingencyDigester


DigesterPairing = [DigesterImpl.contingency]


@dataclass
class DigesterConfigNew:
    index: int
    impl: DigesterImpl
    is_pairing: bool

    @classmethod
    def from_dto(cls, dto: DigesterDto):
        impl = DigesterImpl[dto.impl.value]

        return cls(
            index=dto.index,
            impl=impl,
            is_pairing=True if impl in DigesterPairing else False,
        )

    def start(self) -> Digester:
        instance = self.impl.value()
        instance.index = self.index
        instance.is_pairing = self.is_pairing
        return instance
