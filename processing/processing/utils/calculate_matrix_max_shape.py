import math


def calculate_matrix_max_shape(memory_in_gigabytes: int, float_size: int = 8) -> int:
    memory_in_bytes = memory_in_gigabytes * math.pow(1024, 3)
    max_elements = math.floor(memory_in_bytes / float_size)
    max_shape = math.floor(math.sqrt(max_elements))
    return max_shape
