from typing import List

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.config.ConfigRange import ConfigRange
from processing.reducers.Reducer import Reducer
from processing.utils.is_nan import is_nan


class ConfigReducer:
    index: int
    name: str
    dimensions: int
    bands: List[ConfigBand]
    integrations: List[ConfigIntegration]
    ranges: List[ConfigRange]

    def __init__(
        self,
        index: int,
        name: str,
        dimensions: int,
        bands: List[ConfigBand],
        integrations: List[ConfigIntegration],
        ranges: List[ConfigRange],
    ) -> None:
        Reducer.validate_name(name)

        self.index = index
        self.name = name
        self.dimensions = dimensions

        self.bands = bands
        self.integrations = integrations
        self.ranges = ranges

    def has(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> bool:
        bands_names = [b.name for b in self.bands]
        integrations_names = [i.name for i in self.integrations]

        if band.name in bands_names and integration.name in integrations_names:
            return True

        return False

    @staticmethod
    def flatten(reducers: List["ConfigReducer"]):
        names = [r.name for r in reducers]
        dimensions = [r.dimensions for r in reducers]
        bands_names = [[b.name for b in r.bands] for r in reducers]
        integrations_names = [[i.name for i in r.integrations] for r in reducers]
        ranges_names = [[r.name for r in r.ranges] for r in reducers]

        return names, dimensions, bands_names, integrations_names, ranges_names

    @staticmethod
    def pick_reducer_bands(
        bands_names_string: str,
        bands: List[ConfigBand],
    ) -> List[ConfigBand]:
        if is_nan(bands_names_string):
            return bands

        bands_names = bands_names_string.split(",")

        picked_bands = [band for band in bands if band.name in bands_names]

        return picked_bands

    @staticmethod
    def pick_reducer_integrations(
        integrations_names_string: str,
        integrations: List[ConfigIntegration],
    ) -> List[ConfigIntegration]:
        if is_nan(integrations_names_string):
            return integrations

        integrations_names = integrations_names_string.split(",")

        picked_integrations = [
            integration
            for integration in integrations
            if integration.name in integrations_names
        ]

        return picked_integrations

    @staticmethod
    def pick_reducer_ranges(
        ranges_names_string: str,
        ranges: List[ConfigRange],
    ) -> List[ConfigRange]:
        if is_nan(ranges_names_string):
            return ranges

        ranges_names = ranges_names_string.split(",")

        picked_ranges = [range for range in ranges if range.name in ranges_names]

        return picked_ranges

    @staticmethod
    def reconstruct(
        names: List[str],
        dimensions: List[int],
        bands_names_strings: List[str],
        integrations_names_strings: List[str],
        ranges_names_strings: List[str],
        bands: List[ConfigBand],
        integrations: List[ConfigIntegration],
        ranges: List[ConfigRange],
    ) -> List["ConfigReducer"]:
        reducers = []

        for index, name in enumerate(names):
            reducer_bands = ConfigReducer.pick_reducer_bands(
                bands_names_string=bands_names_strings[index],
                bands=bands,
            )

            reducer_integrations = ConfigReducer.pick_reducer_integrations(
                integrations_names_string=integrations_names_strings[index],
                integrations=integrations,
            )

            reducer_ranges = ConfigReducer.pick_reducer_ranges(
                ranges_names_string=ranges_names_strings[index],
                ranges=ranges,
            )

            reducer = ConfigReducer(
                index=index,
                name=name,
                dimensions=dimensions[index],
                bands=reducer_bands,
                integrations=reducer_integrations,
                ranges=reducer_ranges,
            )

            reducers.append(reducer)

        return reducers

    def create_reducer(
        self,
        seed: int,
    ):
        return Reducer(
            name=self.name,
            target_dimensions=self.dimensions,
            seed=seed,
        )
