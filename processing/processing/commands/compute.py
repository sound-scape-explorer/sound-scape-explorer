import click

from processing.classes.BuilderCovering import BuilderCovering
from processing.classes.BuilderFeature import BuilderFeature
from processing.classes.BuilderIndicators import BuilderIndicators
from processing.classes.BuilderUMAP import BuilderUMAP
from processing.classes.BuilderVolume import BuilderVolume
from processing.cli import cli


@cli.group()
def compute():
    # cli group
    pass


@compute.command()
@click.option('--no-plot/--plot', '-np', default=False)
@click.option('--show/--no-show', '-s', default=False)
def umap(no_plot: bool, show: bool) -> None:
    BuilderUMAP(not no_plot, show)


@compute.command()
@click.option('--no-plot/--plot', '-np', default=False)
@click.option('--show/--no-show', '-s', default=False)
def covering(no_plot: bool, show: bool) -> None:
    BuilderCovering(not no_plot, show)


@compute.command()
@click.option('--no-plot/--plot', '-np', default=False)
@click.option('--show/--no-show', '-s', default=False)
def volume(no_plot: bool, show: bool) -> None:
    BuilderVolume(not no_plot, show)


@compute.command()
def features() -> None:
    BuilderFeature()


@compute.command()
def indicators() -> None:
    BuilderIndicators()
