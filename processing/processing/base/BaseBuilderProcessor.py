from typing import Callable

from numpy import ndarray

BaseBuilderProcessorInterface = Callable[[ndarray, int], float]
