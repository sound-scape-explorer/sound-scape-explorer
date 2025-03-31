from signal import SIGINT, signal

from processing.actions.run_autoclusters import run_autoclusters
from processing.actions.run_computations import run_computations
from processing.actions.run_computations_export import run_computations_export
from processing.actions.run_computations_purge import run_computations_purge
from processing.actions.run_configuration_refresh import run_configuration_refresh
from processing.actions.run_dataframe_export import run_dataframe_export
from processing.actions.run_digestions import run_digestions
from processing.actions.run_extractions_aggregations import run_extractions_aggregations
from processing.actions.run_mdm_export import run_mdm_export
from processing.actions.run_reductions import run_reductions
from processing.actions.run_relative_trajectories import run_relative_trajectories
from processing.actions.run_trajectories import run_trajectories
from processing.askers.ask_menu import ask_menu
from processing.common.MenuChoice import MenuChoice
from processing.context import Context
from processing.new.logger import configure_logger
from processing.new.print_settings import print_settings
from processing.utils.prettify_exceptions import prettify_exceptions
from processing.utils.quit_application import quit_application


@prettify_exceptions
def menu(config_path: str, is_debug=False):
    configure_logger(is_debug)

    context = Context(config_path)
    print_settings(context)

    def handle_sigint(_signum, _frame):
        quit_application(context)

    try:
        signal(SIGINT, handle_sigint)

        # TODO: maybe wrap the menu invoke inside a new try..catch block?
        while True:
            answer = ask_menu(context)
            context.last_choice = answer

            action_map = {
                MenuChoice.RunAll.value: lambda: (
                    run_configuration_refresh(context, is_silent=True),
                    run_extractions_aggregations(context),
                    run_reductions(context),
                    run_computations(context),
                    run_autoclusters(context),
                    run_trajectories(context),
                    run_relative_trajectories(context),
                    run_digestions(context),
                ),
                MenuChoice.RunConfigurationRefresh.value: lambda: (
                    run_configuration_refresh(context),
                ),
                MenuChoice.RunExtractionsAggregations.value: lambda: (
                    run_configuration_refresh(context, is_silent=True),
                    run_extractions_aggregations(context),
                ),
                MenuChoice.RunReductions.value: lambda: (
                    run_configuration_refresh(context, is_silent=True),
                    run_reductions(context),
                ),
                MenuChoice.RunComputations.value: lambda: (
                    run_configuration_refresh(context, is_silent=True),
                    run_computations(context),
                ),
                MenuChoice.RunComputationsPurge.value: lambda: (
                    run_configuration_refresh(context, is_silent=True),
                    run_computations_purge(context),
                ),
                MenuChoice.RunAutoclusters.value: lambda: (
                    run_configuration_refresh(context, is_silent=True),
                    run_autoclusters(context),
                ),
                MenuChoice.RunTrajectories.value: lambda: (
                    run_configuration_refresh(context, is_silent=True),
                    run_trajectories(context),
                ),
                MenuChoice.RunRelativeTrajectories.value: lambda: (
                    run_configuration_refresh(context, is_silent=True),
                    run_relative_trajectories(context),
                ),
                MenuChoice.RunDigestions.value: lambda: (
                    run_configuration_refresh(context, is_silent=True),
                    run_digestions(context),
                ),
                MenuChoice.RunDataframeExport.value: lambda: (
                    run_dataframe_export(context),
                ),
                MenuChoice.RunComputationsExport.value: lambda: (
                    run_computations_export(context),
                ),
                MenuChoice.RunMdmExport.value: lambda: run_mdm_export(context),
            }

            action = action_map.get(answer)

            if action:
                action()
            else:
                quit_application(context)

    except KeyboardInterrupt:
        quit_application(context)
