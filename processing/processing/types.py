from typing import Literal

import numpy as np
import numpy.typing as npt
from pydantic_extra_types.timezone_name import TimeZoneName

Timezone = TimeZoneName | Literal["UTC"]

# mdm
Mdm = npt.NDArray[np.float32]

# metrics
NdsiBand = tuple[int, int]

# autoclusters
AutoclusterLabels = list[int]
AutoclusterTagValue = str
AutoclusterTagValues = list[AutoclusterTagValue]
AutoclusterTagMapping = dict[str, AutoclusterTagValues]
