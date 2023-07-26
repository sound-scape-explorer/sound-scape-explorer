from typing import List

from pandas import DataFrame


def convert_dataframe_to_list(
    df: DataFrame,
    flatten: bool = True,
) -> List[float]:
    list_ = df.to_numpy()

    if flatten is True:
        list_.flatten()

    return list(list_)
