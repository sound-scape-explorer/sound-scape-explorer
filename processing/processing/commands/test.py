from processing.classes.BuilderIndicator import BuilderIndicator
from processing.cli import cli


@cli.command()
def test() -> None:
    BuilderIndicator()
