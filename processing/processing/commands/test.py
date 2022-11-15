import click

from processing.cli import cli


@cli.command()
def test():
    click.echo('test (toplevel)')
