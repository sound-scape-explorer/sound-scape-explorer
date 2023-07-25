from typing import List


def reverse_array(array: List[List[str]]) -> List[List[str]]:
    reversed_array = list(zip(*array))
    reversed_array = list(list(sublist) for sublist in reversed_array)
    return reversed_array
