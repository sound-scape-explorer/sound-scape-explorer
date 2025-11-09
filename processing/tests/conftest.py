from pathlib import Path

import pytest

from processing.config.ExtractorConfig import ExtractorConfig
from processing.context import Context
from processing.dtos import ExtractorDto
from processing.enums import ExtractorImpl
from processing.storage.Storage import Storage

examples_dir = "examples"
json_file = "coral-reef-light.json"


@pytest.fixture
def config_path():
    project_root = Path(__file__).parent.parent.parent
    config_file = project_root / examples_dir / json_file
    assert config_file.exists(), f"Config file not found: {config_file}"
    absolute_path = str(config_file.absolute())
    return absolute_path


@pytest.fixture
def context(config_path):
    ctx = Context(config_path)
    return ctx


@pytest.fixture
def context_vggish(context):
    context.storage.close()

    new_storage_path = context.config.settings.storage_path.replace(
        ".h5",
        ".test.vggish.h5",
    )
    context.config.settings.storage_path = new_storage_path
    context.storage = Storage(new_storage_path)

    new_extractor = ExtractorConfig.from_dto(
        ExtractorDto(
            index=0,
            name="extractor",
            impl=ExtractorImpl.VGGISH,
            window=1000,
            hop=1000,
        ),
    )

    extraction = context.config.extractions[0]
    extraction.extractors = [new_extractor]
    context.config.extractions = [extraction]
    return context
