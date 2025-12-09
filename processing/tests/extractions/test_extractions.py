import numpy as np

from fixtures.context import context_factory
from processing.actions.run_extractions import run_extractions
from processing.constants import (
    VGGISH_WINDOW_MS,
    BIRDNET_WINDOW_MS,
    PERCH_WINDOW_MS,
    SURF_PERCH_WINDOW_MS,
    YAMNET_WINDOW_MS,
    MUSIC_CLASS_WINDOW_MS,
    WINDOW_MS,
    SPECTRO_N_BANDS,
    MPS_STFT_1_WINDOW_MS,
    MPS_STFT_1_OVERLAP_RATIO,
    MPS_STFT_2_WINDOW_MS,
    HOP_MS,
    MPS_N_BANDS,
    MFCC_N_MFCC,
    SPECTRO_STFT_OVERLAP_RATIO,
)
from processing.context import Context
from processing.enums import ExtractorImpl
from processing.lib.shapes import assert_shape
from processing.managers.ExtractionManager import ExtractionManager
from processing.repositories.ExtractionRepository import ExtractionRepository
from processing.utils.predict_mfcc_shape import predict_mfcc_shape
from processing.utils.predict_mps_shape import predict_mps_shape


def _run_extraction_test(
    context: Context,
    window_ms: int,
    embeddings_dimensions: int,
):
    run_extractions(context)

    assert ExtractionRepository.exists(
        context
    ), "Extracted data should exist after extraction"

    for ei in ExtractionManager.iterate(context):
        for file in ei.site.files:
            extracted = ExtractionRepository.from_storage(
                context=context,
                extraction=ei.extraction,
                extractor=ei.extractor,
                band=ei.band,
                file=file,
            )

            # embeddings have the correct shape
            assert_shape(
                extracted.embeddings,
                (60 / (window_ms / 1000), embeddings_dimensions),
            )

            # embeddings have valid data
            is_zeros = np.all(extracted.embeddings == 0)
            assert not is_zeros, "Embeddings should not be all zeros"

            has_nans = np.any(np.isnan(extracted.embeddings))
            assert not has_nans, "Embeddings should not contain NaN values"

            # arrays have the correct lengths
            num_windows = extracted.embeddings.shape[0]

            assert (
                len(extracted.starts) == num_windows
            ), "Should have one start time per embedding window"

            assert (
                len(extracted.ends) == num_windows
            ), "Should have one end time per embedding window"

            assert (
                len(extracted.astarts) == num_windows
            ), "Should have one absolute start time per embedding window"

            assert (
                len(extracted.aends) == num_windows
            ), "Should have one absolute end time per embedding window"

            # time values are chronological
            assert all(
                extracted.starts[i] < extracted.starts[i + 1]
                for i in range(len(extracted.starts) - 1)
            ), "Start times should be monotonically increasing"

            assert all(
                extracted.ends[i] <= extracted.starts[i + 1]
                for i in range(len(extracted.ends) - 1)
            ), "Windows should not overlap incorrectly"

            # absolute times are correct
            expected_astarts = [s + file.timestamp for s in extracted.starts]

            assert (
                extracted.astarts == expected_astarts
            ), "Absolute start times should be relative + file timestamp"

            # window duration matches configuration
            if len(extracted.starts) > 1:
                hop_duration = extracted.starts[1] - extracted.starts[0]

                assert (
                    hop_duration == ei.extractor.hop
                ), f"Hop duration should be {ei.extractor.hop}ms, got {hop_duration}ms"


# neural


def test_vggish(context_factory):
    ctx = context_factory(ExtractorImpl.VGGISH)
    _run_extraction_test(ctx, VGGISH_WINDOW_MS, 128)


def test_birdnet(context_factory):
    ctx = context_factory(ExtractorImpl.BIRDNET)
    _run_extraction_test(ctx, BIRDNET_WINDOW_MS, 1024)


def test_perch(context_factory):
    ctx = context_factory(ExtractorImpl.PERCH)
    _run_extraction_test(ctx, PERCH_WINDOW_MS, 1280)


def test_surf_perch(context_factory):
    ctx = context_factory(ExtractorImpl.SURF_PERCH)
    _run_extraction_test(ctx, SURF_PERCH_WINDOW_MS, 1280)


def test_yamnet(context_factory):
    ctx = context_factory(ExtractorImpl.YAMNET)
    _run_extraction_test(ctx, YAMNET_WINDOW_MS, 1024)


def test_music_class(context_factory):
    ctx = context_factory(ExtractorImpl.MUSIC_CLASS)
    _run_extraction_test(ctx, MUSIC_CLASS_WINDOW_MS, 960)


# low level


def test_spectrum(context_factory):
    ctx = context_factory(ExtractorImpl.SPECTRUM)
    _run_extraction_test(ctx, WINDOW_MS, SPECTRO_N_BANDS)


def test_spectrogram(context_factory):
    ctx = context_factory(ExtractorImpl.SPECTROGRAM)
    _run_extraction_test(ctx, WINDOW_MS, SPECTRO_N_BANDS)


def test_mps(context_factory):
    ctx = context_factory(ExtractorImpl.MPS)

    expected_shape = predict_mps_shape(
        audio_duration_sec=60,
        sample_rate=44100,
        window_ms=WINDOW_MS,
        hop_ms=HOP_MS,
        stft_1_window_ms=MPS_STFT_1_WINDOW_MS,
        stft_1_overlap_ratio=MPS_STFT_1_OVERLAP_RATIO,
        stft_2_window_ms=MPS_STFT_2_WINDOW_MS,
        n_bands=MPS_N_BANDS,
        max_modulation_freq=100,
    )

    _run_extraction_test(ctx, WINDOW_MS, expected_shape[1])


def test_mfcc(context_factory):
    ctx = context_factory(ExtractorImpl.MFCC)

    expected_shape = predict_mfcc_shape(
        audio_duration_seconds=60,
        sample_rate=44100,
        window_ms=WINDOW_MS,
        n_mfcc=MFCC_N_MFCC,
        stft_window_ms=WINDOW_MS,
        stft_overlap_ratio=SPECTRO_STFT_OVERLAP_RATIO,
    )

    _run_extraction_test(ctx, WINDOW_MS, expected_shape[1])


# acoustics


def test_ndsi(context_factory):
    ctx = context_factory(ExtractorImpl.NDSI)
    _run_extraction_test(ctx, WINDOW_MS, 1)


def test_bi(context_factory):
    ctx = context_factory(ExtractorImpl.BI)
    _run_extraction_test(ctx, WINDOW_MS, 1)


def test_adi(context_factory):
    ctx = context_factory(ExtractorImpl.ADI)
    _run_extraction_test(ctx, WINDOW_MS, 1)


def test_hf(context_factory):
    ctx = context_factory(ExtractorImpl.HF)
    _run_extraction_test(ctx, WINDOW_MS, 1)


def test_ht(context_factory):
    ctx = context_factory(ExtractorImpl.HT)
    _run_extraction_test(ctx, WINDOW_MS, 1)


def test_med(context_factory):
    ctx = context_factory(ExtractorImpl.MED)
    _run_extraction_test(ctx, WINDOW_MS, 1)


def test_aci(context_factory):
    ctx = context_factory(ExtractorImpl.ACI)
    _run_extraction_test(ctx, WINDOW_MS, 1)


def test_leq(context_factory):
    ctx = context_factory(ExtractorImpl.LEQ)
    _run_extraction_test(ctx, WINDOW_MS, 1)


def test_leq_percentile(context_factory):
    ctx = context_factory(ExtractorImpl.LEQ_PERCENTILE)
    _run_extraction_test(ctx, WINDOW_MS, 1)


def test_leq_diff(context_factory):
    ctx = context_factory(ExtractorImpl.LEQ_DIFF)
    _run_extraction_test(ctx, WINDOW_MS, 1)
