from signal import SIGINT, signal

from processing.actions.run_aggregations import run_aggregations
from processing.actions.run_autoclusters import run_autoclusters
from processing.actions.run_computations import run_computations
from processing.actions.run_computations_export import run_computations_export
from processing.actions.run_computations_purge import run_computations_purge
from processing.actions.run_dataframe_export import run_dataframe_export
from processing.actions.run_extractions import (
    run_extractions,
)
from processing.actions.run_mdm_export import run_mdm_export
from processing.actions.run_metrics import run_metrics
from processing.actions.run_reductions import run_reductions
from processing.actions.run_relative_trajectories import run_relative_trajectories
from processing.actions.run_trajectories import run_trajectories
from processing.common.MenuChoice import MenuChoice
from processing.context import Context
from processing.printers.print_settings import print_settings
from processing.prompts.prompt_menu import prompt_menu
from processing.repositories.ConfigRepository import ConfigRepository
from processing.utils.prettify_exceptions import prettify_exceptions
from processing.utils.quit_application import quit_application


@prettify_exceptions
def menu(config_path: str):
    context = Context(config_path)
    print_settings(context)
    ConfigRepository.to_storage(context)

    def handle_sigint(_signum, _frame):
        quit_application(context)

    try:
        signal(SIGINT, handle_sigint)

        while True:
            answer = prompt_menu(context)
            context.last_choice = answer

            action_map = {
                MenuChoice.RUN_ALL.value: lambda: (
                    run_extractions(context),
                    run_aggregations(context),
                    run_reductions(context),
                    run_computations(context),
                    run_autoclusters(context),
                    run_metrics(context),
                    run_trajectories(context),
                    run_relative_trajectories(context),
                ),
                MenuChoice.RUN_EXTRACTIONS.value: lambda: run_extractions(context),
                MenuChoice.RUN_AGGREGATIONS.value: lambda: run_aggregations(context),
                MenuChoice.RUN_REDUCTIONS.value: lambda: run_reductions(context),
                MenuChoice.RUN_COMPUTATIONS.value: lambda: run_computations(context),
                MenuChoice.RUN_AUTOCLUSTERS.value: lambda: run_autoclusters(context),
                MenuChoice.RUN_METRICS.value: lambda: run_metrics(context),
                MenuChoice.RUN_TRAJECTORIES.value: lambda: run_trajectories(context),
                MenuChoice.RUN_RELATIVE_TRAJECTORIES.value: lambda: (
                    run_relative_trajectories(context),
                ),
                MenuChoice.RUN_COMPUTATIONS_PURGE.value: lambda: (
                    run_computations_purge(context),
                ),
                MenuChoice.RUN_DATAFRAME_EXPORT.value: lambda: (
                    run_dataframe_export(context),
                ),
                MenuChoice.RUN_COMPUTATIONS_EXPORT.value: lambda: (
                    run_computations_export(context),
                ),
                MenuChoice.RUN_MDM_EXPORT.value: lambda: run_mdm_export(context),
            }

            action = action_map.get(answer)

            if action:
                action()
            else:
                quit_application(context)

    except KeyboardInterrupt:
        quit_application(context)
