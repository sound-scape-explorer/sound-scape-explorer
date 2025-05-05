from processing.config.ExtractionConfig import ExtractionConfig
from processing.config.IntegrationConfig import IntegrationConfig


def validate_extraction_against_integration(
    extraction: ExtractionConfig,
    integration: IntegrationConfig,
) -> bool:
    is_valid = True

    for extractor in extraction.extractors:
        if integration.duration >= extractor.window:
            continue

        is_valid = False
        print(
            f"Integration #{integration.index} window {integration.duration} ms is shorter than extractor #{extractor.index} window {extractor.window} ms"
        )

    return is_valid
