import numpy as np
import numpy.typing as npt


# mdm
Mdm = npt.NDArray[np.float32]

# metrics
NdsiBand = tuple[int, int]

# autoclusters
AutoclusterLabels = list[int]
AutoclusterTagValue = str
AutoclusterTagValues = list[AutoclusterTagValue]
AutoclusterTagMapping = dict[str, AutoclusterTagValues]
