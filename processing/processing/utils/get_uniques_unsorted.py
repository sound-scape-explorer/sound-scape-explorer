from typing import Any, List


def get_uniques_unsorted(array: List[Any]) -> List[str]:
    uniques = []

    for element in array:
        string = str(element)

        if string in uniques:
            continue

        uniques.append(string)

    return uniques
