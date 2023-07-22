from typing import List


def split_array_by_length(
    array: List[List[float]],
    length: int,
) -> List[List[List[float]]]:
    split_array = []

    elements_per_sublist = len(array) // length

    for _ in range(length):
        split_array.append([])

    for sublist_index in range(length):
        start = elements_per_sublist * sublist_index
        end = elements_per_sublist * (sublist_index + 1)

        sublist = array[start:end]

        for elements in sublist:
            split_array[sublist_index].append(elements)

    return split_array
