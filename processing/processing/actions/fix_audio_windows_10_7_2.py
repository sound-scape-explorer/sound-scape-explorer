import re
from typing import Optional

from processing.config.Config import Config
from processing.interfaces import IMain
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.print_action import print_action
from processing.utils.print_no_configuration import print_no_configuration

regex = "([0-9]{13})\/([0-9]{0,5})(.*)"


def fix_string(string: str) -> str:
    """
    Failing strings:
        1668596700000/0/home/user/samples/audio/.wav
        1668596700000/15000/home/user/samples/audio/.wav

        1668596700000/0Z:\sample\audio\.wav
        1668596700000/15000Z:\sample\audio\.wav

    Strings to have:
        1668596700000/0//home/user/samples/audio/.wav
        1668596700000/0/Z:\sample\audio\.wav
    """
    m = re.search(regex, string)
    assert m is not None, f"Unable to find match for {string}"
    return f"{m.group(0)}/{m.group(1)}/{m.group(2)}"


# Fix audio on Windows happening in versions before 10.7.2
def fix_audio_windows_10_7_2(
    storage: Storage,
    callback: Optional[IMain] = None,
):
    if not Config.exists_in_storage(storage):
        print_no_configuration()
        if callback is not None:
            callback(storage)
        return

    print_action("Audio on Windows for versions <=10.7.2 started!", "start")

    path = f"{StoragePath.aggregated_interval_details.value}"
    group = storage.read(path)

    for band in group.keys():
        band_path = f"{path}/{band}"
        band_group = storage.read(band_path)

        for integration in band_group.keys():
            integration_path = f"{band_path}/{integration}"
            integration_group = storage.read(integration_path)

            for dataset_index in integration_group.keys():
                dataset_path = f"{integration_path}/{dataset_index}"
                dataset = storage.read(dataset_path)

                for i in range(len(dataset)):
                    old_string = dataset.asstr()[i][0]
                    dataset[i] = [fix_string(old_string)]

    print_action("Audio on Windows for versions <=10.7.2 started!", "end")

    if callback is not None:
        callback(storage)
