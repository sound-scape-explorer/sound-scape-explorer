from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig
from processing.lib.console import Console


class Validate:
    @staticmethod
    def extraction_vs_integration(
        extraction: ExtractionConfig,
        integration: IntegrationConfig,
    ) -> bool:
        is_valid = True

        for extractor in extraction.extractors:
            if integration.duration >= extractor.window:
                continue

            is_valid = False
            Console.print_error(
                f"Integration #{integration.index} window {integration.duration} ms is shorter than extractor #{extractor.index} window {extractor.window} ms"
            )

        return is_valid
