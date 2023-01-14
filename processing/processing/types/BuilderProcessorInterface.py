from typing import Callable

from numpy import ndarray

BuilderProcessorInterface = Callable[[ndarray, int], float]
