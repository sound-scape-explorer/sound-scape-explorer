from processing.classes.BuilderIndicators import BuilderIndicators
from processing.cli import cli


@cli.command()
def test() -> None:
    BuilderIndicators()
