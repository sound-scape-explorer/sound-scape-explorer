from typing import List

from pandas import DataFrame

from processing.constants import STRING_YES


def validate_excel_booleans(df: DataFrame, default: bool) -> List[bool]:
    return [True if p == STRING_YES else default for p in df.tolist()]
