from signal import SIGINT, signal
from typing import Optional

from rich.console import Console

from processing.actions.autocluster import autocluster
from processing.actions.compute_requirements import compute_requirements
from processing.actions.digest import digest
from processing.actions.export_computation_umaps import export_computation_umaps
from processing.actions.export_dataframe import export_dataframe
from processing.actions.export_mdm import export_mdm
from processing.actions.extract_and_aggregate import extract_and_aggregate
from processing.actions.fix_audio_windows_10_7_2 import fix_audio_windows_10_7_2
from processing.actions.purge_requirements import purge_requirements
from processing.actions.reduce import reduce
from processing.actions.refresh_configuration import refresh_configuration
from processing.actions.repack_storage import repack_storage
from processing.actions.trace_relative_trajectories import trace_relative_trajectories
from processing.actions.trace_trajectories import trace_trajectories
from processing.config.Config import Config
from processing.storage.Storage import Storage
from processing.utils.ask_menu import MenuChoice, ask_menu
from processing.utils.print_welcome import print_welcome
from processing.utils.quit_sse import quit_sse

stored_config: Config
last_choice: Optional[MenuChoice] = None


def main(
    loaded_storage: Optional[Storage] = None,
    config_path: Optional[str] = None,
):
    """CLI entry point"""

    global stored_config
    global last_choice

    try:
        if config_path is not None:
            config = Config(path=config_path)
            stored_config = config
        else:
            config = stored_config

        if loaded_storage is None:
            print_welcome()
            storage = Storage(config.settings.storage_path)
        else:
            storage = loaded_storage

        signal(SIGINT, lambda _signum, _frame: quit_sse(storage))

        answer = ask_menu(storage, last_choice)
        last_choice = answer

        if answer == MenuChoice.RefreshConfig.value:
            refresh_configuration(config, storage, main)
        if answer == MenuChoice.ExtractAggregate.value:
            refresh_configuration(config, storage)
            extract_and_aggregate(storage, main)
        if answer == MenuChoice.Reduce.value:
            refresh_configuration(config, storage)
            reduce(storage, main)
        if answer == MenuChoice.ComputeRequirements.value:
            refresh_configuration(config, storage)
            compute_requirements(storage, main)
        if answer == MenuChoice.PurgeRequirements.value:
            refresh_configuration(config, storage)
            purge_requirements(storage, main)
        if answer == MenuChoice.Autocluster.value:
            refresh_configuration(config, storage)
            autocluster(storage, main)
        if answer == MenuChoice.Trace.value:
            refresh_configuration(config, storage)
            trace_trajectories(storage, main)
        if answer == MenuChoice.RelativeTrace.value:
            refresh_configuration(config, storage)
            trace_relative_trajectories(storage, main)
        if answer == MenuChoice.Digest.value:
            refresh_configuration(config, storage)
            digest(storage, main)
        if answer == MenuChoice.RunAll.value:
            refresh_configuration(config, storage)
            extract_and_aggregate(storage)
            reduce(storage)
            compute_requirements(storage)
            autocluster(storage)
            trace_trajectories(storage)
            trace_relative_trajectories(storage)
            digest(storage, main)
        if answer == MenuChoice.ExportDataframe.value:
            export_dataframe(config, storage, main)
        if answer == MenuChoice.ExportComputationUmaps.value:
            export_computation_umaps(config, storage, main)
        if answer == MenuChoice.ExportMeanDistancesMatrix.value:
            export_mdm(config, storage, main)
        if answer == MenuChoice.Repack.value:
            repack_storage(storage, main)
        if answer == MenuChoice.FixAudioWindows10_7_2.value:
            refresh_configuration(config, storage)
            fix_audio_windows_10_7_2(storage, main)
        else:
            quit_sse(storage)
    except Exception:
        console = Console()
        console.print_exception(show_locals=True)
