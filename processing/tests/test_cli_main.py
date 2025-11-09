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


def test_low_memory_one_gig(config_path):
    import subprocess

    result = subprocess.run(
        ["sse", config_path, "-m", "1024"],
        capture_output=True,
        text=True,
    )

    assert result.returncode == 1
    assert "Memory limit exceeded" in result.stdout


def test_low_memory_two_gigs(config_path):
    import subprocess

    result = subprocess.run(
        ["sse", config_path, "-m", "2048"],
        capture_output=True,
        text=True,
    )

    assert result.returncode == 1
    assert "Memory limit exceeded" in result.stdout


def test_memory_four_gigs(config_path):
    """
    This should display the menu even if
    4Gb won't be enough to load some heavy models
    like birdNET
    """
    with (
        patch("sys.argv", ["sse", config_path, "-m", "4096"]),
        patch("processing.menu.prompt_menu") as mock_prompt,
        pytest.raises(SystemExit) as sys_exit,
    ):
        from processing.cli import main

        mock_prompt.return_value = MenuChoice.QUIT.value
        main()
        assert sys_exit.value.code == 0
