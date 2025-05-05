import os


def disable_cuda():
    os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
