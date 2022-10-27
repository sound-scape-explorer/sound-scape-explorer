from torch import hub

hub.load_state_dict_from_url(
    'https://github.com/harritaylor/torchvggish/'
    'releases/download/v0.1/vggish-10086976.pth',
    progress=True
)
