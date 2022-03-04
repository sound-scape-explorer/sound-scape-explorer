"""
Create specific documentation from the markdown annotation to README.html
"""
import os
import re


def replaces(markdown: str, dictionary: dict) -> str:
    finalStr = markdown
    for key, value in dictionary.items():
        nStr = value
        finalStr = re.sub(
            '([<][!][- ]{2}[ ]*)('+key+')([ ]*[-]{2}[>])', nStr, finalStr)  # To optimize
    return finalStr


def main():
    path = "./sse-v1/public/.hiddenREADME.html"
    os.system("markdown README.md > "+path)
    file = open(path, 'r')
    markdown = file.read()
    if (markdown == "" or markdown == None):
        print("not write")
        return
    # we need to inject style. By link tag iner body work in standalone not into vue component.
    cssfile = open('retro.css', 'r')
    css = cssfile.read()
    cssfile.close()
    # '<link href="./retro.css" rel="stylesheet">'}
    dico = {'style': '<style>'+css+'</style>'}
    # replace by reading the retro.css file
    markdown = replaces(markdown, dico)
    file.flush()
    file.close()
    file = open(path, 'w')
    file.write(markdown)
    file.flush()
    file.close()


if __name__ == '__main__':
    main()
