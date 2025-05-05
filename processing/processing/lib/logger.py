import ctypes
import logging
import os
import sys
import warnings

from rich.logging import RichHandler


def silence_tensorflow_completely():
    """Silence TensorFlow and related libraries completely."""
    # Set environment variables to suppress TensorFlow logs
    os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"  # ERROR only
    os.environ["AUTOGRAPH_VERBOSITY"] = "0"  # No AutoGraph messages
    os.environ["TF_ENABLE_DEPRECATION_WARNINGS"] = "false"  # No deprecation warnings

    # Configure CUDA to grow memory as needed instead of pre-allocating
    os.environ["TF_FORCE_GPU_ALLOW_GROWTH"] = "true"

    # Suppress Python warnings
    warnings.filterwarnings("ignore")

    # Silence absl before it's initialized
    original_stderr = sys.stderr
    sys.stderr = open(os.devnull, "w")

    # This must be imported after setting the environment variables
    try:
        import absl.logging

        # Disable absl logging completely
        absl.logging.set_verbosity(absl.logging.ERROR)
        absl.logging.set_stderrthreshold(absl.logging.FATAL)
        # Prevent absl handler from being added to root logger
        logging.root.removeHandler(absl.logging._absl_handler)
        absl.logging._warn_preinit_stderr = False

        # Configure TensorFlow logging
        import tensorflow as tf

        tf.get_logger().setLevel(logging.ERROR)
        tf.autograph.set_verbosity(0)

        # Disable TensorFlow deprecation warnings
        from tensorflow.python.util import deprecation

        deprecation._PRINT_DEPRECATION_WARNINGS = False

        # For TensorFlow 1.x compatibility
        try:
            tf.compat.v1.logging.set_verbosity(tf.compat.v1.logging.ERROR)
        except:
            pass
    except ImportError:
        pass

    # Restore stderr
    sys.stderr = original_stderr


def silence_c_warnings():
    """Silence C library warnings by redirecting stderr."""
    libc = ctypes.CDLL(None)
    _c_stderr = ctypes.c_void_p.in_dll(libc, "stderr")
    _original_stderr = os.dup(2)
    null_fd = os.open(os.devnull, os.O_WRONLY)
    os.dup2(null_fd, 2)


class CustomFilter(logging.Filter):
    def filter(self, record):
        # Silence all tensorflow, cuda, and absl related logs
        if any(
            name in record.name.lower()
            for name in ["tensorflow", "tf", "cuda", "gpu", "xla", "absl", "numba"]
        ):
            return False

        # when loading menu
        if record.name == "asyncio" and record.levelno == logging.DEBUG:
            return False

        # when downloading with gdown
        if record.name == "urllib3.connectionpool" and record.levelno == logging.DEBUG:
            return False

        # when extracting with birdnet
        if (
            record.name == "numba.core.byteflow"
            or record.name == "numba.core.interpreter"
            or record.name == "tensorflow"
        ) and record.levelno <= logging.DEBUG:
            return False

        # when reducing with umap
        if (record.name == "numba.core.ssa" and record.levelno == logging.DEBUG) or (
            record.name == "numba.core.typeinfer" and record.levelno == logging.DEBUG
        ):
            return False

        # If the message contains specific tensorflow-related keywords, filter it
        if hasattr(record, "msg") and isinstance(record.msg, str):
            tf_related_keywords = [
                "tensorflow",
                "cuda",
                "gpu",
                "xla",
                "cudnn",
                "cublas",
                "computation placer",
                "cuinit",
                "custom gradients",
            ]
            if any(keyword in record.msg.lower() for keyword in tf_related_keywords):
                return False

        return True


def init_logger():
    # silence tensorflow
    silence_tensorflow_completely()

    # silence C warnings
    # TODO: this should be bypassable because it can skip import errors on app load
    silence_c_warnings()

    # setup logging custom handler
    handler = RichHandler()
    handler.addFilter(CustomFilter())

    warnings.filterwarnings("ignore")  # Ignore all warnings

    logging.basicConfig(
        level="NOTSET",
        format="%(message)s",
        datefmt="[%X]",
        handlers=[handler],
    )

    # Set specific loggers to ERROR level only
    for logger_name in [
        "tensorflow",
        "absl",
        "numba",
        "urllib3",
        "matplotlib",
        "PIL",
        "h5py",
        "asyncio",
    ]:
        logging.getLogger(logger_name).setLevel(logging.ERROR)


def get_logger():
    return logging.getLogger("rich")
