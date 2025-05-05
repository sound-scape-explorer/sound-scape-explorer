from processing.context import Context


class FileTags:
    @staticmethod
    def get_names(context: Context):
        files = context.config.files

        names: list[str] = []

        for file in files:
            for key, _ in file.tags.items():
                if key in names:
                    continue

                names.append(key)

        return names
