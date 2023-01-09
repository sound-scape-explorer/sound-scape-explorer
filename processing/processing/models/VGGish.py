from typing import List

from torch import hub

from processing.models.VGG import VGG
from processing.utils.get_device import get_device
from processing.utils.make_layers import make_layers
from processing.utils.waveform_to_examples import waveform_to_examples


# class VGGish(VGG, metaclass=SingletonMeta):
class VGGish(VGG):
    frequency_range: List[int]

    def __init__(
        self,
        frequency_range: List[int] = (0, 20000),
    ):
        self.frequency_range = frequency_range

        self.device = get_device()

        print(f"Instantiating VGGish model with {self.device}")

        super().__init__(make_layers())

        state_dict = hub.load_state_dict_from_url(
            'https://github.com/harritaylor/torchvggish/'
            'releases/download/v0.1/vggish-10086976.pth',
            progress=True
        )

        super().load_state_dict(state_dict)

        self.to(self.device)

    # TODO: Type me!
    def forward(self, x, fs):
        x = waveform_to_examples(
            x.to(device=self.device),
            fs,
            self.frequency_range
        )

        return VGG.forward(self, x)
