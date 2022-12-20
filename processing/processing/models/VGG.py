import torch
from torch import nn


# class VGG(nn.Module, metaclass=SingletonMeta):
class VGG(nn.Module):
    def __init__(self, features):
        super(VGG, self).__init__()
        self.features = features
        self.embeddings = nn.Sequential(
            nn.Linear(512 * 4 * 6, 4096), nn.ReLU(True),
            nn.Linear(4096, 4096), nn.ReLU(True),
            nn.Linear(4096, 128), nn.ReLU(True)
        )

    def forward(self, x):
        with torch.no_grad():
            x = self.features(x)
            # Transpose the output from features to
            # remain compatible with vggish embeddings
            x = torch.transpose(x, 1, 3)
            x = torch.transpose(x, 1, 2)
            x = x.contiguous()
            x = x.view(x.size(0), -1)
            return self.embeddings(x)
