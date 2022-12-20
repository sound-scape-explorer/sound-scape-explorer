from torch import hub

from processing.models.VGG import VGG
from processing.utils.get_device import get_device
from processing.utils.make_layers import make_layers
from processing.utils.waveform_to_examples import waveform_to_examples


# class VGGish(VGG, metaclass=SingletonMeta):
class VGGish(VGG):
    def __init__(self, band_params):
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
        self.band_params = band_params

    def forward(self, x, fs):
        x = waveform_to_examples(x.to(device=self.device), fs, self.band_params)
        return VGG.forward(self, x)
