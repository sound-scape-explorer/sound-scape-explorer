from typing import List


class Spectrogram:
    s: List[List[float]]
    tn: List[float]
    fn: List[float]
    ext: List[float]

    def __init__(
        self,
        spectrogram: List[List[float]],
        tn: List[float],
        fn: List[float],
        ext: List[float],
    ) -> None:
        self.s = spectrogram
        self.tn = tn
        self.fn = fn
        self.ext = ext
