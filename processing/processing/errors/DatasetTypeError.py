class DatasetTypeError(Exception):
    def __init__(self) -> None:
        super().__init__("Unsupported data type")
