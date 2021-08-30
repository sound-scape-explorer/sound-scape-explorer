
import click
from click import echo
from click import secho
import utils
import pprint

##############
@click.group()
def cli():
    pass
##############


###### standalone commands
@cli.command()
def test():
    print('test (toplevel)')

@cli.command()
def show_config():
    cfg = get_config()
    pprint.pprint(cfg._asdict())



###### COMMAND extract
@cli.group()
def extract():
    pass

@extract.command()
def preview():
    print('hello')


######################################################################
# config handling etc
_cache_config = None
def get_config():
    global _cache_config
    if _cache_config is None:
        _cache_config = utils.parse_config()
    return _cache_config




######################################################################
# msg = can also be used as 'sse' after pip install
if __name__ == '__main__':
    from pathlib import Path
    import sys
    print('######################################################################')
    print('                                                                     #')
    print('It is recommend to pip install this script, maybe run:               #')
    path = Path(sys.argv[0]).parent.absolute().relative_to(Path.cwd())
    print(('    pip install -U ' + str(path) + '/' + ' '*99)             [:69]+'#')
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




