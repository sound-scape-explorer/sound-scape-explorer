from processing.utils.add_unique_value_only_to_array import \
    add_unique_value_only_to_array
from processing.utils.check_or_create_index_in_array import \
    check_or_create_index_in_array
from processing.utils.get_directories_and_files import get_directories_and_files
from processing.utils.read_meta_values_from_filepath import \
    read_meta_values_from_filepath


def get_meta_values_from_disk(audio_base_path):
    _directories, files = get_directories_and_files(audio_base_path)

    all_meta_values = []
    unique_meta_values = []

    for file in files:
        meta_values = read_meta_values_from_filepath(file)
        all_meta_values.append(meta_values)

        for meta_value_index, meta_value in enumerate(meta_values):
            check_or_create_index_in_array(unique_meta_values, meta_value_index)
            add_unique_value_only_to_array(
                unique_meta_values[meta_value_index],
                meta_value
                )

    return all_meta_values, unique_meta_values, len(unique_meta_values)
