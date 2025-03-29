from rich.progress import track

from processing.context import Context
from processing.new.ComputedManager import ComputedManager
from processing.new.MeanDistancesMatrixManager import MeanDistancesMatrixManager
from processing.utils.print_action import print_action


def purge_requirements(context: Context):
    print_action("Requirements computation purge started!", "start")

    for _ in track(range(1)):
        ComputedManager.delete(context)
        MeanDistancesMatrixManager.delete(context.storage)

    print_action("Requirements computation purge completed!", "end")
