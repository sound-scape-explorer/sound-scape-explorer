import click

from processing.cli import cli


@cli.command()
def hello():
    click.echo('Hello !')
