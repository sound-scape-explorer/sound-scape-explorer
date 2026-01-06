from typing import TypeVar, Optional

T = TypeVar("T")


def use_or_default(value: Optional[T], default: T) -> T:
    if value is None:
        return default

    return value
