from typing import List, TypeVar

T = TypeVar("T")


def flat(array: List[List[T]]) -> List[T]:
    return [item for sublist in array for item in sublist]
