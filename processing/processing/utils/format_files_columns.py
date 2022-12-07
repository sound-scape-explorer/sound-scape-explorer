def format_files_columns(files):
    for key, value in files.items():
        files[key] = [value[0], value[1], value[2], [*value[3:]]]

    return files
