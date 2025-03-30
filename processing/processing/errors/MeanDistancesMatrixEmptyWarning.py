from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.utils.print_action import print_action


class MeanDistancesMatrixEmptyWarning(Exception):
    def __init__(
        self,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        extractor: ExtractorConfigNew,
    ) -> None:
        message = (
            f"Band {band.name}"
            f", integration {integration.name}"
            f", extractor {extractor.name}"
            f": Mean distances matrix is empty, skipping..."
        )
        print_action(message, "warning")
