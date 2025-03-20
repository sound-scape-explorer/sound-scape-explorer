from typing import Iterable

from processing.new.BandConfigNew import BandConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew


# TODO: refactor me
def walk_bands_integrations(
    bands: list[BandConfigNew],
    integrations: list[IntegrationConfigNew],
) -> Iterable[tuple[BandConfigNew, IntegrationConfigNew]]:
    for band in bands:
        for integration in integrations:
            yield band, integration
