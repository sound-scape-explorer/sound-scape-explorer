import click

from processing.classes.BuilderCovering import BuilderCovering
from processing.classes.BuilderFeature import BuilderFeature
from processing.classes.BuilderIndicator import BuilderIndicator
from processing.classes.BuilderIndicatorAcousticComplexityIndex import \
    BuilderIndicatorAcousticComplexityIndex
from processing.classes.BuilderIndicatorAcousticDiversityIndex import \
    BuilderIndicatorAcousticDiversityIndex
from processing.classes.BuilderIndicatorBioacousticsIndex import \
    BuilderIndicatorBioacousticsIndex
from processing.classes.BuilderIndicatorFrequencyEntropy import \
    BuilderIndicatorFrequencyEntropy
from processing.classes.BuilderIndicatorNormalizedDifferenceSoundscapeIndex \
    import \
    BuilderIndicatorNormalizedDifferenceSoundscapeIndex
from processing.classes.BuilderIndicatorTemporalEntropy import \
    BuilderIndicatorTemporalEntropy
from processing.classes.BuilderIndicatorTemporalLeq import \
    BuilderIndicatorTemporalLeq
from processing.classes.BuilderIndicatorTemporalMedian import \
    BuilderIndicatorTemporalMedian
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
    BuilderIndicator()


@compute.command()
def indicators_aci() -> None:
    aci = BuilderIndicatorAcousticComplexityIndex()
    aci.export()


@compute.command()
def indicators_adi() -> None:
    adi = BuilderIndicatorAcousticDiversityIndex()
    adi.export()


@compute.command()
def indicators_bi() -> None:
    bi = BuilderIndicatorBioacousticsIndex()
    bi.export()


@compute.command
def indicators_hf() -> None:
    hf = BuilderIndicatorFrequencyEntropy()
    hf.export()


@compute.command
def indicators_ndsi() -> None:
    ndsi = BuilderIndicatorNormalizedDifferenceSoundscapeIndex()
    ndsi.export()


@compute.command
def indicators_ht() -> None:
    ht = BuilderIndicatorTemporalEntropy()
    ht.export()


@compute.command
def indicators_leq_t() -> None:
    leq_t = BuilderIndicatorTemporalLeq()
    leq_t.export()


@compute.command
def indicators_med() -> None:
    med = BuilderIndicatorTemporalMedian()
    med.export()
