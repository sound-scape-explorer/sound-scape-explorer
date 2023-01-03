from processing.classes.ConfigGenerator import ConfigGenerator
from processing.cli import cli


@cli.group()
def config():
    # cli group
    pass


@config.command()
def populate_files():
    ConfigGenerator('config.xlsx')
