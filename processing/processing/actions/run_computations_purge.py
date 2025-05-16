from rich.progress import track

from processing.context import Context
from processing.printers.print_action import print_action
from processing.repositories.ComputationRepository import ComputationRepository
from processing.repositories.MeanDistancesMatrixRepository import (
    MeanDistancesMatrixRepository,
)


def run_computations_purge(context: Context):
    print_action("Requirements computation purge started!", "start")

    for _ in track(range(1)):
        ComputationRepository.delete(context)
        MeanDistancesMatrixRepository.delete(context.storage)

    print_action("Requirements computation purge completed!", "end")
