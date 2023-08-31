from rich import print


def print_new_line(is_replace: bool = False) -> None:
    string = "[bold]---[/bold]"

    if is_replace is True:
        print(string, end="\r")
        return

    print(string)
