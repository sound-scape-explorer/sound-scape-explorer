import numpy as np

from processing.actions.run_reductions import run_reductions
from processing.context import Context
from processing.enums import ExtractorImpl
from processing.managers.AggregationManager import AggregationManager
from processing.repositories.AggregationRepository import AggregationRepository
from processing.services.SiteService import SiteService


def _run(context: Context):
    run_reductions(context)

    sites = SiteService.get_sites(context)

    for ai in AggregationManager.iterate(context):
        intervals = AggregationRepository.from_storage(
            context=context,
            extraction=ai.extraction,
            band=ai.band,
            integration=ai.integration,
        )

        # time validation
        for site in sites:
            filtered = [
                interval for interval in intervals if site == interval.files[0].site
            ]

            starts = [interval.start for interval in filtered]
            ends = [interval.end for interval in filtered]

            # timestamps should be chronological
            assert all(
                starts[i] < starts[i + 1] for i in range(len(starts) - 1)
            ), "Timestamps should be monotonically increasing"

            assert all(
                ends[i] <= starts[i + 1] for i in range(len(ends) - 1)
            ), "Intervals should not overlap incorrectly"

        # data validation
        for interval in intervals:
            # embeddings have valid data
            is_zeros = np.all(interval.embeddings == 0)
            assert not is_zeros, "Embeddings should not be all zeros"

            has_nans = np.any(np.isnan(interval.embeddings))
            assert not has_nans, "Embeddings should not contain NaN values"


# neural


def test_vggish(context_factory):
    ctx = context_factory(ExtractorImpl.VGGISH)
    _run(ctx)


def test_birdnet(context_factory):
    ctx = context_factory(ExtractorImpl.BIRDNET)
    _run(ctx)


def test_perch(context_factory):
    ctx = context_factory(ExtractorImpl.PERCH)
    _run(ctx)


def test_surf_perch(context_factory):
    ctx = context_factory(ExtractorImpl.SURF_PERCH)
    _run(ctx)


def test_yamnet(context_factory):
    ctx = context_factory(ExtractorImpl.YAMNET)
    _run(ctx)


def test_music_class(context_factory):
    ctx = context_factory(ExtractorImpl.MUSIC_CLASS)
    _run(ctx)


# low level


def test_spectrum(context_factory):
    ctx = context_factory(ExtractorImpl.SPECTRUM)
    _run(ctx)


def test_spectrogram(context_factory):
    ctx = context_factory(ExtractorImpl.SPECTROGRAM)
    _run(ctx)


def test_mps(context_factory):
    ctx = context_factory(ExtractorImpl.MPS)
    _run(ctx)


def test_mfcc(context_factory):
    ctx = context_factory(ExtractorImpl.MFCC)
    _run(ctx)


# acoustics


def test_ndsi(context_factory):
    ctx = context_factory(ExtractorImpl.NDSI)
    _run(ctx)


def test_bi(context_factory):
    ctx = context_factory(ExtractorImpl.BI)
    _run(ctx)


def test_adi(context_factory):
    ctx = context_factory(ExtractorImpl.ADI)
    _run(ctx)


def test_hf(context_factory):
    ctx = context_factory(ExtractorImpl.HF)
    _run(ctx)


def test_ht(context_factory):
    ctx = context_factory(ExtractorImpl.HT)
    _run(ctx)


def test_med(context_factory):
    ctx = context_factory(ExtractorImpl.MED)
    _run(ctx)


def test_aci(context_factory):
    ctx = context_factory(ExtractorImpl.ACI)
    _run(ctx)


def test_leq(context_factory):
    ctx = context_factory(ExtractorImpl.LEQ)
    _run(ctx)


def test_leq_percentile(context_factory):
    ctx = context_factory(ExtractorImpl.LEQ_PERCENTILE)
    _run(ctx)


def test_leq_diff(context_factory):
    ctx = context_factory(ExtractorImpl.LEQ_DIFF)
    _run(ctx)
