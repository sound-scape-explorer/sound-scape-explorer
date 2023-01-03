import click

from processing.cli import cli


@cli.command()
def help() -> None:
    click.echo('eval "$(_SSE_COMPLETE=bash_source sse)"')
    click.echo('')
    click.echo('sse show config > generated/ghost-config.json')
    click.echo(
        "(printf '%s' 'JSONJS = ' ; sse show config) > "
        "generated/ghost-config-json.js"
    )
    click.echo('sse cors-http-server')
    click.echo('')
    click.echo('For a real help, pass the --help option')
