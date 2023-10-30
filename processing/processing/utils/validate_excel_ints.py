from typing import List

from pandas import DataFrame


def validate_excel_ints(df: DataFrame, default: int) -> List[int]:
    return [int(v) if isinstance(v, str) else default for v in df.tolist()]
