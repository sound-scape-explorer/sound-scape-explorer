from rich.progress import track

from processing.context import Context
from processing.repositories.ComputedRepository import ComputedRepository
from processing.repositories.MeanDistancesMatrixRepository import MeanDistancesMatrixRepository
from processing.printers.print_action import print_action


def run_computations_purge(context: Context):
    print_action("Requirements computation purge started!", "start")

    for _ in track(range(1)):
        ComputedRepository.delete(context)
        MeanDistancesMatrixRepository.delete(context.storage)

    print_action("Requirements computation purge completed!", "end")
