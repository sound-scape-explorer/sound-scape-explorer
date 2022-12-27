from processing.utils.add_unique_value_only_to_array import \
    add_unique_value_only_to_array
from processing.utils.check_or_create_index_in_array import \
    check_or_create_index_in_array
from processing.utils.get_directories_and_files import get_directories_and_files
from processing.utils.read_meta_values_from_filepath import \
    read_meta_values_from_filepath


def get_columns_from_disk(audio_base_path):
    _directories, files = get_directories_and_files(audio_base_path)

    all_columns = []
    unique_columns = []

    for file in files:
        meta_values = read_meta_values_from_filepath(file)
        all_columns.append(meta_values)

        for c, column in enumerate(meta_values):
            check_or_create_index_in_array(unique_columns, c)
            add_unique_value_only_to_array(unique_columns[c], column)

    return all_columns, unique_columns, len(unique_columns)
