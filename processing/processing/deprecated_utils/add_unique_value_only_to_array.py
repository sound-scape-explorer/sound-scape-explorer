def add_unique_value_only_to_array(array, value):
    if value in array:
        return

    array.append(value)
