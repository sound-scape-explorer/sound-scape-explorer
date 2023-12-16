from typing import Union

minimum_ram_in_gigabytes = 5.2


# Use for testing purposes to artificially limit the amount of memory used
def limit_memory_resource(
    gigabytes: Union[int, float] = minimum_ram_in_gigabytes,
) -> None:
    import resource

    memory_limit_in_bytes = int(1024 * 1024 * 1024 * gigabytes)
    limits = (memory_limit_in_bytes, memory_limit_in_bytes)
    resource.setrlimit(resource.RLIMIT_AS, limits)
