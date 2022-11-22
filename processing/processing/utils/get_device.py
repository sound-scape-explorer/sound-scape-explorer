from torch import cuda


def get_device():
    if cuda.is_available():
        return 'cuda'
    else:
        return 'cpu'
