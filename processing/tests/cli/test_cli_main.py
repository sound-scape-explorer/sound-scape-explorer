from unittest.mock import patch

import pytest

from processing.common.MenuChoice import MenuChoice


def test_invalid_config():
    with (
        patch("sys.argv", ["sse", "impossible.json"]),
        pytest.raises(FileNotFoundError),
    ):
        from processing.cli import main

        main()


def test_valid_config(config_path):
    with (
        patch("sys.argv", ["sse", config_path]),
        patch("processing.menu.prompt_menu") as mock_prompt,
        pytest.raises(SystemExit) as sys_exit,
    ):
        from processing.cli import main

        mock_prompt.return_value = MenuChoice.QUIT.value
        main()
        assert sys_exit.value.code == 0


def test_valid_config_cpu(config_path):
    with (
        patch("sys.argv", ["sse", config_path, "--cpu"]),
        patch("processing.menu.prompt_menu") as mock_prompt,
        pytest.raises(SystemExit) as sys_exit,
    ):
        from processing.cli import main

        mock_prompt.return_value = MenuChoice.QUIT.value
        main()
        assert sys_exit.value.code == 0
