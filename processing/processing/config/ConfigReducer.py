from typing import List

from processing.reducers.Reducer import Reducer


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
        Reducer.validate_name(name)

        self.name = name
        self.dimensions = dimensions

        self.bands = bands
        self.integrations = integrations
        self.ranges = ranges

    def create_reducer(
        self,
        seed: int,
    ):
        return Reducer(
            name=self.name,
            target_dimensions=self.dimensions,
            seed=seed,
        )


ConfigReducers = List[ConfigReducer]
