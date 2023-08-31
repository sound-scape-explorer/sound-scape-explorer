from typing import Iterable, List, Tuple

from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig


def walk_bands_integrations(
    bands: List[BandConfig],
    integrations: List[IntegrationConfig],
) -> Iterable[Tuple[BandConfig, IntegrationConfig]]:
    for band in bands:
        for integration in integrations:
            yield band, integration
