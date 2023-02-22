from typing import List, TypedDict


class IndicatorJSONType(TypedDict):
    name: str
    description: str
    data: List[float]
