import unittest

import torch
from torch import Tensor

from processing.models.AbstractModel import AbstractModel


class ConcreteModel(AbstractModel):
    def __init__(self):
        super().__init__()
        self.sample_rate = None

    def set_sample_rate(
        self,
        sample_rate: int,
    ) -> None:
        self.sample_rate = sample_rate

    def forward(
        self,
        tensor: Tensor,
    ) -> Tensor:
        return tensor


class TestConcreteModel(unittest.TestCase):
    def test_set_sample_rate(self):
        # Create an instance of ConcreteModel
        model = ConcreteModel()

        # Call set_sample_rate with a sample rate of 16000
        model.set_sample_rate(16000)

        # Verify that the sample rate was set correctly
        self.assertEqual(model.sample_rate, 16000)

    def test_forward(self):
        # Create an instance of ConcreteModel
        model = ConcreteModel()

        # Create a random tensor of shape (batch_size, channels, length)
        tensor = torch.randn(2, 1, 100)

        # Call forward with the tensor
        output = model.forward(tensor)

        # Verify that the output tensor has the correct shape
        self.assertEqual(output.shape, (2, 1, 100))
