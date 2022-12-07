from processing.utils.add_unique_value_only_to_array import \
    add_unique_value_only_to_array
from processing.utils.check_or_create_index_in_array import \
    check_or_create_index_in_array
from processing.utils.get_columns import get_columns
from processing.utils.get_directories_and_files import get_directories_and_files


def get_columns_from_disk(audio_base_path):
    [_directories, files] = get_directories_and_files(audio_base_path)

    unique_columns = []
    all_columns = []
    columns_length = -1

    for file in files:
        columns = get_columns(file)
        all_columns.append(columns)

        for c, column in enumerate(columns):
            check_or_create_index_in_array(unique_columns, c)
            add_unique_value_only_to_array(unique_columns[c], column)
            if c > columns_length:
                columns_length = c

    return [unique_columns, all_columns, columns_length]
