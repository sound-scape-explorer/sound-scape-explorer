from typing import Any, List


def get_uniques_from_list(list_: List[Any]):
    uniques = []

    for item in list_:
        if item in uniques:
            continue

        uniques.append(item)

    return uniques
