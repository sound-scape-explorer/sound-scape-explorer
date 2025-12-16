import pytest

from processing.config.ExtractorConfig import ExtractorConfig
from processing.constants import (
    BIRDNET_WINDOW_MS,
    VGGISH_WINDOW_MS,
    PERCH_WINDOW_MS,
    SURF_PERCH_WINDOW_MS,
    YAMNET_WINDOW_MS,
    MUSIC_CLASS_WINDOW_MS,
    WINDOW_MS,
)
from processing.context import Context
from processing.dtos import ExtractorDto
from processing.enums import ExtractorImpl
from processing.storage.Storage import Storage

# Mapping of extractor to its window size
EXTRACTOR_WINDOWS = {
    ExtractorImpl.VGGISH: VGGISH_WINDOW_MS,
    ExtractorImpl.BIRDNET: BIRDNET_WINDOW_MS,
    ExtractorImpl.PERCH: PERCH_WINDOW_MS,
    ExtractorImpl.SURF_PERCH: SURF_PERCH_WINDOW_MS,
    ExtractorImpl.YAMNET: YAMNET_WINDOW_MS,
    ExtractorImpl.MUSIC_CLASS: MUSIC_CLASS_WINDOW_MS,
    ExtractorImpl.SPECTRUM: WINDOW_MS,
    ExtractorImpl.SPECTROGRAM: WINDOW_MS,
    ExtractorImpl.MPS: WINDOW_MS,
    ExtractorImpl.MFCC: WINDOW_MS,
    ExtractorImpl.NDSI: WINDOW_MS,
    ExtractorImpl.BI: WINDOW_MS,
    ExtractorImpl.ADI: WINDOW_MS,
    ExtractorImpl.HF: WINDOW_MS,
    ExtractorImpl.HT: WINDOW_MS,
    ExtractorImpl.MED: WINDOW_MS,
    ExtractorImpl.ACI: WINDOW_MS,
    ExtractorImpl.LEQ: WINDOW_MS,
    ExtractorImpl.LEQ_PERCENTILE: WINDOW_MS,
    ExtractorImpl.LEQ_DIFF: WINDOW_MS,
}


@pytest.fixture
def context_factory(monkeypatch, config_path):
    contexts = []

    def _make_context(impl: ExtractorImpl, window: int | None = None):
        # Auto-lookup window if not provided
        if window is None:
            window = EXTRACTOR_WINDOWS[impl]

        def mock_context_init(self, path: str):
            from processing.config.Config import Config

            self.config = Config(path)

            # Set custom storage path
            new_storage_path = self.config.settings.storage_path.replace(
                ".h5",
                f".test.{impl.name}.h5",
            )
            self.config.settings.storage_path = new_storage_path
            self.storage = Storage(new_storage_path)
            self.last_choice = None

        monkeypatch.setattr(Context, "__init__", mock_context_init)
        ctx = Context(config_path)

        # Configure extractor
        new_extractor = ExtractorConfig.from_dto(
            ExtractorDto(
                index=0,
                name=impl.value,
                impl=impl,
                window=window,
                hop=window,
                include_in_aggregation=True,
            ),
        )

        extraction = ctx.config.extractions[0]
        object.__setattr__(extraction, "extractions", [extraction])
        ctx.config.extractions = [extraction]

        contexts.append(ctx)
        return ctx

    yield _make_context

    # Cleanup all created contexts
    for c in contexts:
        c.storage.close()
