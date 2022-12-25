import click

from processing.cli import cli


@cli.command()
def test() -> None:
    click.echo('test (toplevel)')
