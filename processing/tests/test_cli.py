from unittest.mock import patch

import pytest

from processing.common.MenuChoice import MenuChoice


def test_cli_with_invalid_config():
    from processing.cli import main

    with patch("sys.argv", ["sse", "impossible.json"]):
        with pytest.raises(FileNotFoundError):
            main()


def test_cli_with_valid_config(config_path):
    from processing.cli import main

    with (
        patch("sys.argv", ["sse", config_path]),
        patch("processing.menu.prompt_menu") as mock_prompt,
        pytest.raises(SystemExit) as sys_exit,
    ):
        mock_prompt.return_value = MenuChoice.QUIT.value
        main()
        assert sys_exit.value.code == 0


