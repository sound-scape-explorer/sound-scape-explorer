from typing import List

from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.config.matrices.MatrixConfig import MatrixConfig
from processing.config.matrices.MatrixSheet import MatrixSheet
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class MatrixStorage:
    names = StoragePath.matrices_names.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(MatrixStorage.names)

    @staticmethod
    def write_to_storage(matrices: List[MatrixConfig], storage: Storage) -> None:
        names = MatrixConfig.flatten(matrices)

        storage.write(path=MatrixStorage.names, data=names)

    @staticmethod
    def read_from_storage(storage: Storage) -> List[MatrixConfig]:
        names_dataset = storage.read(StoragePath.volumes_names)
        names = storage.convert_dataset_to_string_list(names_dataset)
        matrices = MatrixConfig.reconstruct(names)
        return matrices

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[MatrixConfig]:
        sheet = ExcelSheet.matrices
        names = parser.get(sheet, MatrixSheet.name_)
        matrices = MatrixConfig.reconstruct(names)
        return matrices
