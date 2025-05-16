import {type ChildProcessWithoutNullStreams, spawn} from 'node:child_process';
import {existsSync} from 'node:fs';
import path from 'node:path';

import {sync} from 'command-exists';
import {ipcMain, ipcRenderer} from 'electron';

import {Channels} from '../channels';
import {FfmpegResolver} from '../resolvers/FfmpegResolver';
import {FfprobeResolver} from '../resolvers/FfprobeResolver';
import {NodeResolver} from '../resolvers/NodeResolver';

export class AudioBridge {
  // todo: rename to module path
  private static readonly servicePath = path.join(
    path.dirname(__dirname),
    '..',
    'audio',
    'main.js',
  );

  private service: ChildProcessWithoutNullStreams | null;

  private readonly nodeResolver = new NodeResolver();

  private readonly ffmpegResolver = new FfmpegResolver();

  private readonly ffprobeResolver = new FfprobeResolver();

  constructor() {
    this.validateServicePath();
    this.validateFfmpeg();
    this.validateFfprobe();

    this.service = null;
    this.setHandlers();
  }

  public static async startFromRenderer(audioPath: string) {
    await ipcRenderer.invoke(Channels.AUDIO_START, [
      AudioBridge.servicePath,
      audioPath,
    ]);
  }

  public static async stopFromRenderer() {
    await ipcRenderer.invoke(Channels.AUDIO_STOP);
  }

  public static async getStatusFromRenderer() {
    return (await ipcRenderer.invoke(Channels.AUDIO_STATUS)) as boolean;
  }

  public stop() {
    if (this.service === null) {
      return;
    }

    this.service.kill();
    this.service = null;
  }

  private validateServicePath() {
    if (!existsSync(AudioBridge.servicePath)) {
      throw new Error('Audio service build could not be found');
    }
  }

  private validateFfmpeg() {
    const ffmpegExists = sync(this.ffmpegResolver.path);

    if (!ffmpegExists) {
      throw new Error('ffmpeg could not be found');
    }
  }

  private validateFfprobe() {
    const ffprobeExists = sync(this.ffprobeResolver.path);

    if (!ffprobeExists) {
      throw new Error('ffprobe could not be found');
    }
  }

  private start(modulePath: string, audioPath: string) {
    if (this.service !== null) {
      return;
    }

    const child = spawn(
      this.nodeResolver.path,
      [
        modulePath,
        this.ffmpegResolver.path,
        this.ffprobeResolver.path,
        audioPath,
      ],
      {
        env: {ELECTRON_RUN_AS_NODE: '1'},
      },
    );

    this.service = child;

    child.stdout.on('data', (data) => {
      console.log(`stdout:\n${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    child.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  private getStatus() {
    return this.service !== null;
  }

  private setHandlers() {
    this.setStartHandler();
    this.setStopHandler();
    this.setStatusHandler();
  }

  private setStartHandler() {
    ipcMain.handle(
      Channels.AUDIO_START,
      (_, [modulePath, audioPath]: [string, string]) => {
        this.start(modulePath, audioPath);
      },
    );
  }

  private setStopHandler() {
    ipcMain.handle(Channels.AUDIO_STOP, this.stop.bind(this));
  }

  private setStatusHandler() {
    ipcMain.handle(Channels.AUDIO_STATUS, this.getStatus.bind(this));
  }
}
