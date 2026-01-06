def clamp_number(
    number: int | float,
    min_value: int | float,
    max_value: int | float,
) -> int | float:
    if number < min_value:
        return min_value

    if number > max_value:
        return max_value

    return number
