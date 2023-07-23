from typing import Dict, List, Tuple, Type

from processing.config.ConfigBand import ConfigBand
from processing.config.ConfigIntegration import ConfigIntegration
from processing.config.ConfigRange import ConfigRange
from processing.reducers.AbstractReducer import AbstractReducer
from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.SparsePcaReducer import SparsePcaReducer
from processing.reducers.UmapReducer import UmapReducer
from processing.reducers.VaeReducer import VaeReducer
from processing.utils.is_nan import is_nan


class ConfigReducer:
    algorithms: Dict[str, Type[AbstractReducer]] = {
        "umap": UmapReducer,
        "vae": VaeReducer,
        "pca": PcaReducer,
        "sparse_pca": SparsePcaReducer,
    }

    index: int
    name: str
    dimensions: int
    bands: List[ConfigBand]
    integrations: List[ConfigIntegration]
    ranges: List[ConfigRange]
    band: ConfigBand
    integration: ConfigIntegration
    instance: AbstractReducer

    def __init__(
        self,
        index: int,
        name: str,
        dimensions: int,
        bands: List[ConfigBand],
        integrations: List[ConfigIntegration],
        ranges: List[ConfigRange],
    ) -> None:
        self._validate_name(name)

        self.index = index
        self.name = name
        self.dimensions = dimensions

        self.bands = bands
        self.integrations = integrations
        self.ranges = ranges

    @staticmethod
    def _validate_name(name: str) -> None:
        if name in ConfigReducer.algorithms.keys():
            return

        raise KeyError(f"Unable to find reducer name {name}.")

    def should_calculate(
        self,
    ) -> bool:
        bands_names = [b.name for b in self.bands]
        integrations_names = [i.name for i in self.integrations]

        if (
            self.band.name in bands_names
            and self.integration.name in integrations_names
        ):
            return True

        return False

    @staticmethod
    def flatten(
        reducers: List["ConfigReducer"],
    ) -> Tuple[
        List[str],
        List[int],
        List[List[str]],
        List[List[str]],
        List[List[str]],
    ]:
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

    def load(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ):
        self.band = band
        self.integration = integration
        return self

    def create_instance(
        self,
        band: ConfigBand,
        integration: ConfigIntegration,
    ) -> AbstractReducer:
        self.load(band=band, integration=integration)
        self.instance = self.algorithms[self.name]()
        return self.instance
