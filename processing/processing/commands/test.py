from processing.classes.NewExtractor import NewExtractor
from processing.classes.NewFeatureGrouper import NewFeatureGrouper
from processing.classes.NewFeatureReducer import NewFeatureReducer
from processing.cli import cli


@cli.command()
def test() -> None:
    NewExtractor()
    NewFeatureGrouper()
    NewFeatureReducer()
