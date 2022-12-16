import numpy


def read_npz_file(path: str):
    content = numpy.load(path)
    return content
