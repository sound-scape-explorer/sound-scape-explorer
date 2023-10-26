from processing.utils.print_action import print_action


def get_file_full_path(filename: str, audio_folder: str):
    if filename[0] == "/":
        path = f"{audio_folder}{filename}"
    else:
        print_action(f"File name {filename} does not start with a /", "error")
        path = f"{audio_folder}/{filename}"

    return path
