import os


def get_directories_and_files(path: str) -> [str, str]:
    my_directories = []
    my_files = []

    for root, dirs, files in os.walk(path, topdown=False):
        for f in files:
            my_files.append(os.path.join(root, f))
        for d in dirs:
            my_directories.append(os.path.join(root, d))

    return [my_directories, my_files]
