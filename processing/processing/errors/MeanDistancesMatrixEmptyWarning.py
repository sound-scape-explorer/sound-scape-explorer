from processing.config.bands.BandConfig import BandConfig
from processing.config.integrations.IntegrationConfig import IntegrationConfig
from processing.utils.print_action import print_action


class MeanDistancesMatrixEmptyWarning(Exception):
    def __init__(
        self,
        band: BandConfig,
        integration: IntegrationConfig,
    ) -> None:
        message = (
            f"Band {band.name}, integration {integration.name}: "
            f"Mean distances matrix is empty, skipping..."
        )
        print_action(message, "warning")
