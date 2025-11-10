import pytest

from processing.config.ExtractorConfig import ExtractorConfig
from processing.constants import BIRDNET_WINDOW_MS, VGGISH_WINDOW_MS
from processing.context import Context
from processing.dtos import ExtractorDto
from processing.enums import ExtractorImpl
from processing.storage.Storage import Storage


@pytest.fixture
def context(config_path):
    ctx = Context(config_path)
    yield ctx
    ctx.storage.close()


@pytest.fixture
def context_vggish(context):
    context.storage.close()
    impl = ExtractorImpl.VGGISH

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
            window=VGGISH_WINDOW_MS,
            hop=VGGISH_WINDOW_MS,
        ),
    )

    extraction = context.config.extractions[0]
    extraction.extractors = [new_extractor]
    context.config.extractions = [extraction]
    yield context
    context.storage.close()


@pytest.fixture
def context_birdnet(context):
    context.storage.close()
    impl = ExtractorImpl.BIRDNET

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
            window=BIRDNET_WINDOW_MS,
            hop=BIRDNET_WINDOW_MS,
        ),
    )

    extraction = context.config.extractions[0]
    extraction.extractors = [new_extractor]
    context.config.extractions = [extraction]
    yield context
    context.storage.close()
