def get_name_and_extension_from_filepath(filepath: str) -> [str, str]:
    parts = filepath.split('/')
    parts_length = len(parts) - 1

    filename_parts = parts[parts_length].split('.')
    filename_parts_length = len(filename_parts) - 1

    name = ".".join(filename_parts[0:filename_parts_length])
    extension = f'.{filename_parts[filename_parts_length]}'

    if len(parts) > 2:
        filepath_with_underscores = "_".join(parts[1:parts_length])
        name = f'{filepath_with_underscores}_{name}'

    return name, extension
