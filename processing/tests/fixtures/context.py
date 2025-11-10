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


@pytest.fixture
def context(config_path):
    ctx = Context(config_path)
    yield ctx
    ctx.storage.close()


def _create_unique_extractor_context(
    context: Context,
    impl: ExtractorImpl,
    window: int,
):
    context.storage.close()

    new_storage_path = context.config.settings.storage_path.replace(
        ".h5",
        f".test.{impl.name}.h5",
    )

    context.config.settings.storage_path = new_storage_path
    context.storage = Storage(new_storage_path)

    new_extractor = ExtractorConfig.from_dto(
        ExtractorDto(
            index=0,
            name=impl.value,
            impl=impl,
            window=window,
            hop=window,
        ),
    )

    extraction = context.config.extractions[0]
    extraction.extractors = [new_extractor]
    context.config.extractions = [extraction]
    return context


@pytest.fixture
def context_vggish(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.VGGISH,
        VGGISH_WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_birdnet(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.BIRDNET,
        BIRDNET_WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_perch(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.PERCH,
        PERCH_WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_surf_perch(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.SURF_PERCH,
        SURF_PERCH_WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_yamnet(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.YAMNET,
        YAMNET_WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_music_class(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.MUSIC_CLASS,
        MUSIC_CLASS_WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_spectrum(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.SPECTRUM,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_spectrogram(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.SPECTROGRAM,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_mps(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.MPS,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_mfcc(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.MFCC,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_ndsi(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.NDSI,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_bi(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.BI,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_adi(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.ADI,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_hf(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.HF,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_ht(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.HT,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_med(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.MED,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_aci(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.ACI,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_leq(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.LEQ,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_leq_percentile(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.LEQ_PERCENTILE,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_leq_diff(context):
    ctx = _create_unique_extractor_context(
        context,
        ExtractorImpl.LEQ_DIFF,
        WINDOW_MS,
    )

    yield ctx
    ctx.storage.close()
