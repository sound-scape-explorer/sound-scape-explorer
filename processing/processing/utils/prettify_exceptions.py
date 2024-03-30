from rich.console import Console


def prettify_exceptions(action):
    def decorator(*args, **kwargs):
        # noinspection PyBroadException
        try:
            return action(*args, **kwargs)
        except Exception:
            console = Console()
            console.print_exception(show_locals=True)

    return decorator
