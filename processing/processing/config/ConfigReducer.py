from typing import List

from processing.maps.ReducerByName import ReducerByName
from processing.reducers import AbstractReducer


class ConfigReducer:
    name: str
    dimensions: int
    bands: List[str]
    integrations: List[str]
    ranges: List[str]

    def __init__(
        self,
        name: str,
        dimensions: int,
        bands: List[str],
        integrations: List[str],
        ranges: List[str],
    ) -> None:
        self.__validate_name(name)

        self.name = name
        self.dimensions = dimensions

        self.bands = bands
        self.integrations = integrations
        self.ranges = ranges

    @staticmethod
    def __validate_name(
        name: str,
    ) -> None:
        if name not in ReducerByName.keys():
            raise KeyError(f'{name} not found!')

    def create_reducer(
        self,
        seed: int,
    ) -> AbstractReducer:
        reducer = ReducerByName[self.name]
        return reducer(
            target_dimensions=self.dimensions,
            seed=seed,
        )


ConfigReducers = List[ConfigReducer]
