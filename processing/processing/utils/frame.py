import numpy


def frame(data, window_length, hop_length):
    num_samples = data.shape[0]
    num_frames = 1 + int(
        numpy.floor((num_samples - window_length) / hop_length))
    shape = (num_frames, window_length) + data.shape[1:]
    strides = (data.strides[0] * hop_length,) + data.strides
    return numpy.lib.stride_tricks.as_strided(data, shape=shape,
                                              strides=strides)
