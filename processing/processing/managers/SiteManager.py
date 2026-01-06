from processing.config.ExtractionConfig import ExtractionConfig
from processing.interfaces import SiteIteration
from processing.services.SiteService import SiteWithFiles


class SiteManager:
    @staticmethod
    def iterate(
        sites: list[SiteWithFiles],
        extractions: list[ExtractionConfig],
    ):
        i = 0

        for site in sites:
            for extraction in extractions:
                for band in extraction.bands:

                    yield SiteIteration(
                        i=i,
                        site=site,
                        extraction=extraction,
                        band=band,
                    )

                    i += 1
