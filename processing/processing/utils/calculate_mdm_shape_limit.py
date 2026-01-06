import math


def calculate_mdm_shape_limit(gigabytes_memory: int | float) -> int:
    total_bytes = gigabytes_memory * (1024**3)
    bytes_per_float64 = 8
    total_float64_elements = total_bytes / bytes_per_float64
    max_square_matrix_dimension = int(math.sqrt(total_float64_elements))

    return max_square_matrix_dimension
