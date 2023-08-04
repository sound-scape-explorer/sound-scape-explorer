import sys


def deep_getsizeof(ob):
    size = sys.getsizeof(ob)

    if isinstance(ob, (list, tuple, set)):
        for element in ob:
            size += deep_getsizeof(element)

    if isinstance(ob, dict):
        for k, v in ob.items():
            size += deep_getsizeof(k)
            size += deep_getsizeof(v)

    return size
