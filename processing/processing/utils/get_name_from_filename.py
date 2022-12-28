def get_name_from_filename(filename: str) -> str:
    return filename.split('.')[0].split('/')[1]
