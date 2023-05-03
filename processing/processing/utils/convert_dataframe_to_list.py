from typing import List

from pandas import DataFrame


def convert_dataframe_to_list(
    df: DataFrame,
) -> List[float]:
    return list(df.to_numpy().flatten())
