def get_columns(path: str) -> [str]:
    path_parts = path.split('/')

    filename_with_extension = path_parts[len(path_parts) - 1]
    filename_with_extension_parts = filename_with_extension.split('.')

    [filename, _extension] = filename_with_extension_parts

    columns = filename.split('_')

    return columns
