import sys

from processing.storage.Storage import Storage


def quit_sse(storage: Storage):
    print("Exiting...")
    storage.close()
    sys.exit(0)
