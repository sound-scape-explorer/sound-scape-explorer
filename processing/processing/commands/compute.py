import click

from processing.classes.Config import Config
from processing.classes.UMAPBuilder import UMAPBuilder
from processing.cli import cli
from processing.computations.compute_coverings import compute_coverings
from processing.computations.compute_features import compute_features
from processing.computations.compute_volumes import compute_volumes


@cli.group()
def compute():
    pass


@compute.command()
@click.option('--no-plot/--plot', '-np', default=False)
@click.option('--show/--no-show', '-s', default=False)
def umap(no_plot: bool, show: bool) -> None:
    plot = not no_plot
    UMAPBuilder(plot, show)


@compute.command()
@click.option('--no-plot/--plot', '-np', default=False)
@click.option('--show/--no-show', '-s', default=False)
def covering(no_plot: bool, show: bool) -> None:
    plot = not no_plot
    cfg = Config().get()
    compute_coverings(cfg, plot, show)


@compute.command()
@click.option('--no-plot/--plot', '-np', default=False)
@click.option('--show/--no-show', '-s', default=False)
def volume(no_plot: bool, show: bool) -> None:
    plot = not no_plot
    cfg = Config().get()
    compute_volumes(cfg, plot, show)


@compute.command()
def features() -> None:
    config = Config().get()
    compute_features(config)
