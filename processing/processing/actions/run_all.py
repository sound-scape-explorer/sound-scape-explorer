from processing.actions.run_aggregations import run_aggregations
from processing.actions.run_autoclusters import run_autoclusters
from processing.actions.run_computations import run_computations
from processing.actions.run_extractions import run_extractions
from processing.actions.run_metrics import run_metrics
from processing.actions.run_reductions import run_reductions
from processing.actions.run_relative_trajectories import run_relative_trajectories
from processing.actions.run_trajectories import run_trajectories
from processing.context import Context


def run_all(context: Context):
    run_extractions(context),
    run_aggregations(context),
    run_reductions(context),
    run_computations(context),
    run_autoclusters(context),
    run_metrics(context),
    run_trajectories(context),
    run_relative_trajectories(context),
