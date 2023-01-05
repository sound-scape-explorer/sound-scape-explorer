from processing.classes.Config import Config
from processing.cli import cli


@cli.command()
def test() -> None:
    config = Config()
    meta_properties = config.get_meta_properties()
    meta_values = config.get_meta_values()
    meta_values_uniques = config.get_meta_values_uniques()

    print(len(meta_properties))
    print(len(meta_values_uniques))
