
import click
from click import echo as print
from click import secho


@click.group()
def cli():
    pass

###### (toplevel)
@cli.command()
def test():
    print('test (toplevel)')



###### extract
@cli.group()
def extract():
    pass

@extract.command()
def preview():
    print('preview (in extract)')








# can also be used as 'sse' after pip install
if __name__ == '__main__':
    from pathlib import Path
    import sys
    print('######################################################################')
    print('                                                                     #')
    print('It is recommend to pip install this script, maybe run:               #')
    path = Path(sys.argv[0]).parent.absolute().relative_to(Path.cwd())
    print(('    pip install -U ' + str(path) + '/' + ' '*99)[:69]+'#')
    print('                                                                     #')
    print('and then to use the sse command, as in:                              #')
    print('    sse --help                                                       #')
    print('                                                                     #')
    print('you can also enable bash autocompletion by running:                  #')
    print('    eval "$(_SSE_COMPLETE=bash_source sse)"                          #')
    print('                                                                     #')
    print('######################################################################')
    print('')
    cli()




