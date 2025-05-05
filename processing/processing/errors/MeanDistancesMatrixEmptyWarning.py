from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.printers.print_action import print_action


class MeanDistancesMatrixEmptyWarning(Exception):
    def __init__(
        self,
        extraction: ExtractionConfig,
        band: BandConfig,
        integration: IntegrationConfig,
    ):
        message = (
            f"Extraction {extraction.name}"
            f", band {band.name}"
            f", integration {integration.name}"
            f": Mean distances matrix is empty, skipping..."
        )

        print_action(message, "warning")
