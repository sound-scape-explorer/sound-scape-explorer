import click

from processing.cli import cli
from processing.computations.compute_UMAPs import compute_UMAPs
from processing.computations.compute_coverings import compute_coverings
from processing.computations.compute_volumes import compute_volumes
from processing.utils.config.get_config import get_config


@cli.group()
def compute():
    pass


@compute.command()
@click.option('--no-plot/--plot', '-np', default=False)
@click.option('--show/--no-show', '-s', default=False)
def umap(no_plot, show):
    plot = not no_plot
    cfg = get_config()
    compute_UMAPs(cfg, plot, show)


@compute.command()
@click.option('--no-plot/--plot', '-np', default=False)
@click.option('--show/--no-show', '-s', default=False)
def covering(no_plot, show):
    plot = not no_plot
    cfg = get_config()
    compute_coverings(cfg, plot, show)


@compute.command()
@click.option('--no-plot/--plot', '-np', default=False)
@click.option('--show/--no-show', '-s', default=False)
def volume(no_plot, show):
    plot = not no_plot
    cfg = get_config()
    compute_volumes(cfg, plot, show)
