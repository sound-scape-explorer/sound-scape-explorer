def check_or_create_index_in_array(array, index):
    try:
        array[index]
    except IndexError:
        array.append([])
