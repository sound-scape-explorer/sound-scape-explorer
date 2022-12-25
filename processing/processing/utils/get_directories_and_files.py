import os


def get_directories_and_files(path: str) -> [str, str]:
    my_directories = []
    my_files = []

    for root, dirs, files in os.walk(path, topdown=True):
        for f in sorted(files):
            my_files.append(os.path.join(root, f))
        for d in sorted(dirs):
            my_directories.append(os.path.join(root, d))

    return my_directories, my_files
