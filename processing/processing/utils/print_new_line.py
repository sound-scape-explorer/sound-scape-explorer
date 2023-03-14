def print_new_line(is_replace: bool = False) -> None:
    string = '---'

    if is_replace is True:
        print(string, end='\r')
        return

    print(string)
