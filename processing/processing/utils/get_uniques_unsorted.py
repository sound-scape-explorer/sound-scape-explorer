from typing import Any


def get_uniques_unsorted(array: list[Any]) -> list[str]:
    uniques = []

    for element in array:
        string = str(element)

        if string in uniques:
            continue

        uniques.append(string)

    return uniques
