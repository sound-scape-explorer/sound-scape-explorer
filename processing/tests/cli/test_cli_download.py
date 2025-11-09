def test_download():
    import subprocess

    result = subprocess.run(
        ["sse_download"],
        capture_output=True,
        text=True,
    )

    assert result.returncode == 0
    assert "You are now ready for offline use!" in result.stdout
