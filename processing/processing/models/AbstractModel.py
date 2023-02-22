from abc import ABC, abstractmethod

from torch import Tensor, nn


class AbstractModel(ABC, nn.Module):
    @abstractmethod
    def set_sample_rate(
        self,
        sample_rate: int,
    ) -> None:
        pass

    @abstractmethod
    def forward(
        self,
        tensor: Tensor,
    ) -> Tensor:
        pass
