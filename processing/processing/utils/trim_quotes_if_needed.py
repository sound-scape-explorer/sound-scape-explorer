def trim_quotes_if_needed(string: str) -> str:
    if string.startswith('"') and string.endswith('"'):
        string = string[1:-1]

    return string
