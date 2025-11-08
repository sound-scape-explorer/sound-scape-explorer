from pathlib import Path

import pytest

examples_dir = "examples"
json_file = "coral-reef-light.json"


@pytest.fixture
def config_path():
    project_root = Path(__file__).parent.parent.parent
    config_file = project_root / examples_dir / json_file
    assert config_file.exists(), f"Config file not found: {config_file}"
    absolute_path = str(config_file.absolute())
    return absolute_path
