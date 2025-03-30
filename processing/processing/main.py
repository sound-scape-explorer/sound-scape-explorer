from signal import SIGINT, signal
from typing import Optional

from processing.actions.fix_audio_windows_10_7_2 import fix_audio_windows_10_7_2
from processing.actions.repack_storage import repack_storage
from processing.actions.run_autoclusters import autocluster
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
from processing.config.Config import Config
from processing.config.JsonConfig import JsonConfig
from processing.storage.Storage import Storage
from processing.utils.ask_menu import MenuChoice, ask_menu
from processing.utils.get_file_type import get_file_type
from processing.utils.prettify_exceptions import prettify_exceptions
from processing.utils.print_welcome import print_welcome
from processing.utils.quit_application import quit_application


stored_config: Config
last_choice: Optional[MenuChoice] = None


@prettify_exceptions
def main(
    loaded_storage: Optional[Storage] = None,
    config_path: Optional[str] = None,
):
    global stored_config
    global last_choice

    if config_path is not None:
        file_type = get_file_type(config_path)

        if file_type == "JSON":
            config = JsonConfig(path=config_path)
            print(config)
        else:
            config = Config(path=config_path)

        stored_config = config
    else:
        config = stored_config

    if loaded_storage is None:
        print_welcome()
        storage = Storage(config.settings.storage_path)
    else:
        storage = loaded_storage

    signal(SIGINT, lambda _signum, _frame: quit_application(storage))

    answer = ask_menu(storage, last_choice)
    last_choice = answer

    if answer == MenuChoice.RunConfigurationRefresh.value:
        run_configuration_refresh(config, storage, main)
    if answer == MenuChoice.RunExtractionsAggregations.value:
        run_configuration_refresh(config, storage)
        run_extractions_aggregations(storage, main)
    if answer == MenuChoice.RunReductions.value:
        run_configuration_refresh(config, storage)
        run_reductions(storage, main)
    if answer == MenuChoice.RunComputations.value:
        run_configuration_refresh(config, storage)
        run_computations(storage, main)
    if answer == MenuChoice.RunComputationsPurge.value:
        run_configuration_refresh(config, storage)
        run_computations_purge(storage, main)
    if answer == MenuChoice.RunAutoclusters.value:
        run_configuration_refresh(config, storage)
        autocluster(storage, main)
    if answer == MenuChoice.RunTrajectories.value:
        run_configuration_refresh(config, storage)
        run_trajectories(storage, main)
    if answer == MenuChoice.RunRelativeTrajectories.value:
        run_configuration_refresh(config, storage)
        run_relative_trajectories(storage, main)
    if answer == MenuChoice.RunDigestions.value:
        run_configuration_refresh(config, storage)
        run_digestions(storage, main)
    if answer == MenuChoice.RunAll.value:
        run_configuration_refresh(config, storage)
        run_extractions_aggregations(storage)
        run_reductions(storage)
        run_computations(storage)
        autocluster(storage)
        run_trajectories(storage)
        run_relative_trajectories(storage)
        run_digestions(storage, main)
    if answer == MenuChoice.RunDataframeExport.value:
        run_dataframe_export(config, storage, main)
    if answer == MenuChoice.RunComputationsExport.value:
        run_computations_export(config, storage, main)
    if answer == MenuChoice.RunMdmExport.value:
        run_mdm_export(config, storage, main)
    if answer == MenuChoice.Repack.value:
        repack_storage(storage, main)
    if answer == MenuChoice.FixAudioWindows10_7_2.value:
        run_configuration_refresh(config, storage)
        fix_audio_windows_10_7_2(storage, main)
    else:
        quit_application(storage)
