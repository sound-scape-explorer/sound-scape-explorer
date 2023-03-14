from typing import List


def convert_band_parameters_string_to_array(
        band_parameters_string: str
) -> List[int]:
    values = band_parameters_string.split('-')

    return [int(value) for value in values]
