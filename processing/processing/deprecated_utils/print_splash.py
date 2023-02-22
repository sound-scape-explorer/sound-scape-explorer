import click


def print_splash():
    # path = Path(sys.argv[0]).parent.absolute().relative_to(Path.cwd())

    click.echo(
        '######################################################################')
    click.echo(
        '                                                                     #')
    click.echo(
        'For most features, it is supposed that this is "pip installed, run:  #')
    # click.echo(('    pip install -U ' + str(path) + '/' + ' ' * 99)[:69] + '#')
    click.echo(
        '                                                                     #')
    click.echo(
        'and then to use the sse command, as in:                              #')
    click.echo(
        '    sse --help                                                       #')
    click.echo(
        '                                                                     #')
    click.echo(
        'you can also enable bash autocompletion by running:                  #')
    click.echo(
        '    eval "$(_SSE_COMPLETE=bash_source sse)"                          #')
    click.echo(
        '                                                                     #')
    click.echo(
        '######################################################################')
    click.echo('')
