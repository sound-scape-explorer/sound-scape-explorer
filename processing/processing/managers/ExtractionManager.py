from processing.config.BandConfig import BandConfig
from processing.config.ExtractionConfig import ExtractionConfig
from processing.factories.ExtractorFactory import ExtractorFactory
from processing.context import Context
from processing.interfaces import ExtractionIteration
from processing.repositories.ExtractedRepository import ExtractedRepository, ExtractedData
from processing.services.SiteService import SiteWithFiles, SiteService


_ExtractorIndex = int
ExtractedByExtractorIndex = dict[_ExtractorIndex, list[ExtractedData]]


class ExtractionManager:
    @staticmethod
    def iterate(context: Context):
        sites = SiteService.get_sites(context)

        for site in sites:
            for extraction in context.config.extractions:
                for extractor in extraction.extractors:
                    for band in extraction.bands:
                        ex = ExtractorFactory.create(extractor, band)

                        yield ExtractionIteration(
                            site=site,
                            band=band,
                            extraction=extraction,
                            extractor=extractor,
                            ex=ex,
                        )

    @staticmethod
    def read(
        context: Context,
        band: BandConfig,
        extraction: ExtractionConfig,
        site: SiteWithFiles,
    ):
        extracted_by_extractor_index: ExtractedByExtractorIndex = {}

        for extractor in extraction.extractors:

            all_extracted: list[ExtractedData] = []

            for file in site.files:
                extracted = ExtractedRepository.from_storage(
                    context=context,
                    extraction=extraction,
                    extractor=extractor,
                    band=band,
                    file=file,
                )

                all_extracted.append(extracted)

            extracted_by_extractor_index[extractor.index] = all_extracted

        yield extracted_by_extractor_index
