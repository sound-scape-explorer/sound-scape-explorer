import re

from h5py import Group

from processing.interfaces import MenuCallback
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath
from processing.utils.invoke_menu import invoke_menu
from processing.utils.print_action import print_action
from processing.utils.validate_configuration import validate_configuration

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


@validate_configuration
def fix_audio_windows_10_7_2(
    storage: Storage,
    callback: MenuCallback,
):
    """Fix audio on Windows happening in versions before 10.7.2"""

    print_action("Audio on Windows for versions <=10.7.2 started!", "start")

    path = f"{StoragePath.aggregated_interval_details.value}"
    group: Group = storage.read(path)

    for band in group.keys():
        band_path = f"{path}/{band}"
        band_group: Group = storage.read(band_path)

        for integration in band_group.keys():
            integration_path = f"{band_path}/{integration}"
            integration_group: Group = storage.read(integration_path)

            for dataset_index in integration_group.keys():
                dataset_path = f"{integration_path}/{dataset_index}"
                dataset = storage.read(dataset_path)

                for i in range(len(dataset)):
                    old_string = dataset.asstr()[i][0]
                    dataset[i] = [fix_string(old_string)]

    print_action("Audio on Windows for versions <=10.7.2 started!", "end")

    invoke_menu(storage, callback)
