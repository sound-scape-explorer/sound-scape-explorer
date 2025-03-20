import sys

from processing.context import Context


def quit_application(context: Context):
    print("Exiting...")
    context.storage.close()
    sys.exit(0)
