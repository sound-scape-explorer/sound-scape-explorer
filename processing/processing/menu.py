from signal import SIGINT, signal

from processing.actions.autocluster import autocluster
from processing.actions.compute_requirements import compute_requirements
from processing.actions.digest import digest
from processing.actions.export_computation_umaps import export_computed
from processing.actions.export_dataframe import export_dataframe
from processing.actions.export_mdm import export_mdm
from processing.actions.extract_and_aggregate import extract_and_aggregate
from processing.actions.purge_requirements import purge_requirements
from processing.actions.reduce import reduce
from processing.actions.refresh_configuration import refresh_configuration
from processing.actions.trace_relative_trajectories import trace_relative_trajectories
from processing.actions.trace_trajectories import trace_trajectories
from processing.common.MenuChoice import MenuChoice
from processing.context import Context
from processing.new.logger import configure_logger
from processing.new.print_settings import print_settings
from processing.utils.ask_menu import ask_menu
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
                    refresh_configuration(context),
                    extract_and_aggregate(context),
                    reduce(context),
                    compute_requirements(context),
                    autocluster(context),
                    trace_trajectories(context),
                    trace_relative_trajectories(context),
                    digest(context),
                ),
                MenuChoice.RefreshConfig.value: lambda: refresh_configuration(context),
                MenuChoice.ExtractAggregate.value: lambda: (
                    refresh_configuration(context),
                    extract_and_aggregate(context),
                ),
                MenuChoice.Reduce.value: lambda: (
                    refresh_configuration(context),
                    reduce(context),
                ),
                MenuChoice.ComputeRequirements.value: lambda: (
                    refresh_configuration(context),
                    compute_requirements(context),
                ),
                MenuChoice.PurgeRequirements.value: lambda: (
                    refresh_configuration(context),
                    purge_requirements(context),
                ),
                MenuChoice.Autocluster.value: lambda: (
                    refresh_configuration(context),
                    autocluster(context),
                ),
                MenuChoice.Trace.value: lambda: (
                    refresh_configuration(context),
                    trace_trajectories(context),
                ),
                MenuChoice.RelativeTrace.value: lambda: (
                    refresh_configuration(context),
                    trace_relative_trajectories(context),
                ),
                MenuChoice.Digest.value: lambda: (
                    refresh_configuration(context),
                    digest(context),
                ),
                MenuChoice.ExportDataframe.value: lambda: export_dataframe(context),
                MenuChoice.ExportComputed.value: lambda: export_computed(context),
                MenuChoice.ExportMeanDistancesMatrix.value: lambda: export_mdm(context),
            }

            action = action_map.get(answer)

            if action:
                action()
            else:
                quit_application(context)

    except KeyboardInterrupt:
        quit_application(context)
