from processing.context import Context


class LabelManager:
    @staticmethod
    def get_properties(context: Context):
        files = context.config.files

        properties: list[str] = []

        for file in files:
            for key, value in file.labels.items():
                if key not in properties:
                    properties.append(key)

        return properties
