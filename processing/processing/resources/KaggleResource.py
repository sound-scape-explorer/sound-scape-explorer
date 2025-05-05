import os


class KaggleResource:
    @staticmethod
    def find_path_from_parent(parent_path: str):
        if not os.path.exists(parent_path):
            raise FileNotFoundError("could not find parent folder")

        should_stop: bool = False
        path: None | str = None

        for dirpath, dirnames, filenames in os.walk(parent_path):
            for filename in filenames:
                if filename.endswith(".complete"):
                    should_stop = True

            if should_stop:
                path = os.path.join(dirpath, dirnames[0])
                break

        if path is None:
            raise FileNotFoundError("could not find parent folder")

        return path
