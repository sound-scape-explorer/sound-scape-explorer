import path from 'node:path';

export abstract class Resolver {
  private isWin = process.platform === 'win32';

  private readonly command: string;

  protected constructor(command: string) {
    this.command = command;
  }

  public get path() {
    return path.join(
      path.dirname(__dirname),
      '..',
      'bin',
      this.isWin ? `${this.command}.exe` : this.command,
    );
  }
}
