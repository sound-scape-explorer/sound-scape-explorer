def get_current_device():
    import tensorflow as tf

    tensor = tf.constant([1.0, 2.0, 3.0])
    return tensor.device
