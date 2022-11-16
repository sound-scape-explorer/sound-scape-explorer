from torch import hub

from processing.models.VGG import VGG
from processing.utils.make_layers import make_layers
from processing.utils.singleton_meta import SingletonMeta
from processing.utils.waveform_to_examples import waveform_to_examples


class VGGish(VGG, metaclass=SingletonMeta):
    def __init__(self, band_params, device=None):
        # TODO: does not work
        # if torch.cuda.is_available():
        # device = 'cuda'

        print(f"Instantiating VGGish model with {device}")

        super().__init__(make_layers())

        state_dict = hub.load_state_dict_from_url(
            'https://github.com/harritaylor/torchvggish/'
            'releases/download/v0.1/vggish-10086976.pth',
            progress=True)

        super().load_state_dict(state_dict)

        self.device = device
        self.to(self.device)
        self.band_params = band_params

    def forward(self, x, fs):
        x = waveform_to_examples(x, fs, self.band_params)
        x = x.to(self.device)
        return VGG.forward(self, x)
