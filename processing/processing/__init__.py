from processing.cli import cli
from processing.commands import hello, test, help, extract, show, compute
from processing.utils.print_splash import print_splash

if __name__ == 'processing':
    cli()
    cli.add_command(hello)
    cli.add_command(test)
    cli.add_command(help)
    cli.add_command(extract)
    cli.add_command(show)
    cli.add_command(compute)
