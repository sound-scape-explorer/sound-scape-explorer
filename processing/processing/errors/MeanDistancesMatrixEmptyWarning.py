from processing.new.BandConfigNew import BandConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.utils.print_action import print_action


class MeanDistancesMatrixEmptyWarning(Exception):
    def __init__(
        self,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
    ) -> None:
        message = (
            f"Band {band.name}, integration {integration.name}: "
            f"Mean distances matrix is empty, skipping..."
        )
        print_action(message, "warning")
