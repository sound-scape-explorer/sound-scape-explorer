def trim_quotes_if_needed(string: str) -> str:
    if string[0] == '"' and string[-1] == '"':
        string = string[1:-1]

    return string
