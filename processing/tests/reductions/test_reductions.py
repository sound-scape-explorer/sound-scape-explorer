import numpy as np

from processing.actions.run_reductions import run_reductions
from processing.context import Context
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


def test_vggish(context_vggish):
    _run(context_vggish)


def test_birdnet(context_birdnet):
    _run(context_birdnet)


def test_perch(context_perch):
    _run(context_perch)


def test_surf_perch(context_surf_perch):
    _run(context_surf_perch)


def test_yamnet(context_yamnet):
    _run(context_yamnet)


def test_music_class(context_music_class):
    _run(context_music_class)


# low level


def test_spectrum(context_spectrum):
    _run(context_spectrum)


def test_spectrogram(context_spectrogram):
    _run(context_spectrogram)


def test_mps(context_mps):
    _run(context_mps)


def test_mfcc(context_mfcc):
    _run(context_mfcc)


# acoustics


def test_ndsi(context_ndsi):
    _run(context_ndsi)


def test_bi(context_bi):
    _run(context_bi)


def test_adi(context_adi):
    _run(context_adi)


def test_hf(context_hf):
    _run(context_hf)


def test_ht(context_ht):
    _run(context_ht)


def test_med(context_med):
    _run(context_med)


def test_aci(context_aci):
    _run(context_aci)


def test_leq(context_leq):
    _run(context_leq)


def test_leq_percentile(context_leq_percentile):
    _run(context_leq_percentile)


def test_leq_diff(context_leq_diff):
    _run(context_leq_diff)
