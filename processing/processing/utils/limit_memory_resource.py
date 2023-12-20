from typing import Union


# Use for testing purposes to artificially limit the amount of memory used
def limit_memory_resource(
    gigabytes: Union[int, float],
) -> None:
    import resource

    memory_limit_in_bytes = int(1024 * 1024 * 1024 * gigabytes)
    limits = (memory_limit_in_bytes, memory_limit_in_bytes)
    resource.setrlimit(resource.RLIMIT_AS, limits)
