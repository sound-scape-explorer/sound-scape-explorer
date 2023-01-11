from processing.classes.Config import Config
from processing.classes.ConfigGenerator import ConfigGenerator
from processing.cli import cli


@cli.group()
def config():
    # cli group
    pass


@config.command()
def populate_files():
    ConfigGenerator('config.xlsx')


@config.command()
def export():
    my_config = Config()
    my_config.export()
