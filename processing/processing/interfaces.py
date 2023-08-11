from typing import Callable, Optional

from processing.storage.Storage import Storage

IMain = Callable[[Optional[Storage]], None]
