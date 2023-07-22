from typing import List, Union

from h5py import Dataset
from pandas import DataFrame


class ContinuousTimeTrajectory:
    __features: List[Dataset]
    __timestamps: Dataset
    __date_start: int
    __date_end: int
    __color_by: str  # Meta Property
    __rolling_step: int
    __dimensions: int
    segments: List[int]
    values: Union[DataFrame, None]

    def __init__(
        self,
        features: List[Dataset],
        timestamps: Dataset,
        date_start: int,
        date_end: int,
        color_by: str,
        dimensions: int = 3,
        rolling_step: int = 1,
    ):
        self.__features = features
        self.__timestamps = timestamps
        self.__date_start = date_start
        self.__date_end = date_end
        self.__color_by = color_by
        self.__dimensions = dimensions
        self.__rolling_step = rolling_step

    @staticmethod
    def flatten():
        # TODO: For storage
        pass

    @staticmethod
    def reconstruct():
        # TODO: For runtime
        pass

    def calculate(self) -> None:
        # TODO: See utils enes sub v2 line 1462
        pass
