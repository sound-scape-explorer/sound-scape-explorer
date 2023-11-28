from typing import Callable, Optional

from processing.storage.Storage import Storage

MenuCallback = Optional[Callable[[Storage], None]]
