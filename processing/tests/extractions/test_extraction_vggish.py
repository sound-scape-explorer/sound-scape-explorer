import numpy as np

from processing.actions.run_extractions import run_extractions
from processing.constants import VGGISH_WINDOW_MS
from processing.lib.shapes import assert_shape
from processing.managers.ExtractionManager import ExtractionManager
from processing.repositories.ExtractionRepository import ExtractionRepository

_expected_data_length = 60 / (VGGISH_WINDOW_MS / 1000)
_expected_embeddings_dimensions = 128


def test_vggish(context_vggish):
    run_extractions(context_vggish)

    assert ExtractionRepository.exists(
        context_vggish
    ), "Extracted data should exist after extraction"

    for ei in ExtractionManager.iterate(context_vggish):
        for file in ei.site.files:
            extracted = ExtractionRepository.from_storage(
                context=context_vggish,
                extraction=ei.extraction,
                extractor=ei.extractor,
                band=ei.band,
                file=file,
            )

            # embeddings have the correct shape
            assert_shape(
                extracted.embeddings,
                (_expected_data_length, _expected_embeddings_dimensions),
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
