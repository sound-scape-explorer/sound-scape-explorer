import click

from processing.cli import cli


@cli.command()
def hello() -> None:
    click.echo('Hello !')
