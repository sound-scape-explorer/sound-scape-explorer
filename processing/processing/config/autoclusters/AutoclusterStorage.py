from typing import List

from processing.config.autoclusters.AutoclusterConfig import AutoclusterConfig
from processing.config.autoclusters.AutoclusterExcel import AutoclusterExcel
from processing.config.ConfigParser import ConfigParser
from processing.config.ExcelSheet import ExcelSheet
from processing.storage.Storage import Storage
from processing.storage.StoragePath import StoragePath


class AutoclusterStorage:
    names = StoragePath.autoclusters_names.value
    min_cluster_sizes = StoragePath.autoclusters_min_cluster_sizes.value
    min_samples = StoragePath.autoclusters_min_samples.value
    alphas = StoragePath.autoclusters_alphas.value
    epsilons = StoragePath.autoclusters_epsilons.value

    @staticmethod
    def delete_from_storage(storage: Storage) -> None:
        storage.delete(AutoclusterStorage.names)
        storage.delete(AutoclusterStorage.min_cluster_sizes)
        storage.delete(AutoclusterStorage.min_samples)
        storage.delete(AutoclusterStorage.alphas)
        storage.delete(AutoclusterStorage.epsilons)

    @staticmethod
    def exists_in_storage(storage: Storage) -> bool:
        return (
            storage.exists_dataset(AutoclusterStorage.names)
            and storage.exists_dataset(AutoclusterStorage.min_cluster_sizes)
            and storage.exists_dataset(AutoclusterStorage.min_samples)
            and storage.exists_dataset(AutoclusterStorage.alphas)
            and storage.exists_dataset(AutoclusterStorage.epsilons)
        )

    @staticmethod
    def read_from_storage(storage: Storage) -> List[AutoclusterConfig]:
        names_dataset = storage.read(AutoclusterStorage.names)

        names = storage.convert_dataset_to_string_list(names_dataset)
        min_cluster_sizes = storage.read(AutoclusterStorage.min_cluster_sizes)
        min_samples_dataset = storage.read(AutoclusterStorage.min_samples)
        min_samples = storage.convert_dataset_to_string_list(min_samples_dataset)
        alphas = storage.read(AutoclusterStorage.alphas)
        epsilons = storage.read(AutoclusterStorage.epsilons)

        autoclusters = AutoclusterConfig.reconstruct(
            names=names,
            min_cluster_sizes=min_cluster_sizes[:],
            min_samples=min_samples[:],
            alphas=alphas[:],
            epsilons=epsilons[:],
        )

        return autoclusters

    @staticmethod
    def read_from_config(parser: ConfigParser) -> List[AutoclusterConfig]:
        sheet = ExcelSheet.autoclusters

        names = parser.get(sheet, AutoclusterExcel.name_)
        mns = parser.get(sheet, AutoclusterExcel.min_cluster_size)
        min_samples = parser.get(sheet, AutoclusterExcel.min_samples)
        min_samples = [str(ms) for ms in min_samples]
        alphas = parser.get(sheet, AutoclusterExcel.alpha)
        epsilons = parser.get(sheet, AutoclusterExcel.epsilon)

        autoclusters = AutoclusterConfig.reconstruct(
            names=names,
            min_cluster_sizes=mns,
            min_samples=min_samples,
            alphas=alphas,
            epsilons=epsilons,
        )

        return autoclusters

    @staticmethod
    def write_to_storage(
        autoclusters: List[AutoclusterConfig],
        storage: Storage,
    ) -> None:
        (
            names,
            min_cluster_sizes,
            min_samples,
            alphas,
            epsilons,
        ) = AutoclusterConfig.flatten(autoclusters)

        storage.write(path=AutoclusterStorage.names, data=names)
        storage.write(path=AutoclusterStorage.min_cluster_sizes, data=min_cluster_sizes)
        storage.write(path=AutoclusterStorage.min_samples, data=min_samples)
        storage.write(path=AutoclusterStorage.alphas, data=alphas)
        storage.write(path=AutoclusterStorage.epsilons, data=epsilons)
