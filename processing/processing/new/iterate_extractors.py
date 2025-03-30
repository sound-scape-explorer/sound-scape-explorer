from typing import NamedTuple, Generator

from processing.context import Context
from processing.new.BandConfigNew import BandConfigNew
from processing.new.ExtractorConfigNew import ExtractorConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew


class ExtractorIteration(NamedTuple):
    band: BandConfigNew
    integration: IntegrationConfigNew
    extractor: ExtractorConfigNew


def iterate_extractors(context: Context) -> Generator[ExtractorIteration, None, None]:
    bands = context.config.bands
    integrations = context.config.integrations
    extractors = context.config.extractors

    for band in bands:
        for integration in integrations:
            for extractor in extractors:
                yield ExtractorIteration(
                    band=band,
                    integration=integration,
                    extractor=extractor,
                )
