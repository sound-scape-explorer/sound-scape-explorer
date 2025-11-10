import numpy as np

from fixtures.context import context_vggish
from processing.actions.run_extractions import run_extractions
from processing.constants import (
    VGGISH_WINDOW_MS,
    BIRDNET_WINDOW_MS,
    PERCH_WINDOW_MS,
    SURF_PERCH_WINDOW_MS,
    YAMNET_WINDOW_MS,
    MUSIC_CLASS_WINDOW_MS,
)
from processing.context import Context
from processing.lib.shapes import assert_shape
from processing.managers.ExtractionManager import ExtractionManager
from processing.repositories.ExtractionRepository import ExtractionRepository


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
            assert not np.all(
                extracted.embeddings == 0
            ), "Embeddings shouldn't be all zeros"

            assert not np.any(
                np.isnan(extracted.embeddings)
            ), "Embeddings shouldn't contain NaN values"

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


def test_vggish(context_vggish):
    _run_extraction_test(
        context_vggish,
        VGGISH_WINDOW_MS,
        128,
    )


def test_birdnet(context_birdnet):
    _run_extraction_test(
        context_birdnet,
        BIRDNET_WINDOW_MS,
        1024,
    )


def test_perch(context_perch):
    _run_extraction_test(
        context_perch,
        PERCH_WINDOW_MS,
        1280,
    )


def test_surf_perch(context_surf_perch):
    _run_extraction_test(
        context_surf_perch,
        SURF_PERCH_WINDOW_MS,
        1280,
    )


def test_yamnet(context_yamnet):
    _run_extraction_test(
        context_yamnet,
        YAMNET_WINDOW_MS,
        1024,
    )


def test_music_class(context_music_class):
    _run_extraction_test(
        context_music_class,
        MUSIC_CLASS_WINDOW_MS,
        960,
    )
