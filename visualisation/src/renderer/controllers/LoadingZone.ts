import {ConfigDto} from '@shared/dtos';
import {ConfigPath} from '@shared/pathRegistry';
import * as h5 from 'jsfive';

import {render} from '../renderer';

export class LoadingZone {
  public audioPath: string | null;

  private readonly node: HTMLDivElement;

  private readonly storageElement: HTMLInputElement;

  public constructor() {
    this.audioPath = null;

    this.node = document.getElementById('loading-zone') as HTMLDivElement;
    this.storageElement = document.getElementById(
      'storage-input',
    ) as HTMLInputElement;

    this.attachEvent();
  }

  public hide() {
    this.node.style.display = 'none';
  }

  public show() {
    this.node.style.display = 'inherit';
  }

  private attachEvent() {
    this.storageElement.addEventListener('change', async (e: InputEvent) => {
      e.preventDefault();

      const input = e.target as HTMLInputElement;
      const files = input.files;

      if (files.length !== 1) {
        alert('Please add only one file');
        return;
      }

      const file = files[0];
      const type = 'application/x-hdf';

      if (file.type !== type) {
        alert('Please add only HDF file');
        return;
      }

      input.value = null;
      const audioPath = await this.readAudioPathFromExcel(file);
      this.audioPath = audioPath;
      await window.electronAPI.startAudioService(audioPath);
      await render();
    });
  }

  private async readAudioPathFromExcel(file: File): Promise<string> {
    await window.electronAPI.setStoragePath(file.path);

    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('load', async (e) => {
        const data = e.target.result as ArrayBuffer;
        const f = new h5.File(data, 'r');
        const path = ConfigPath.config;
        const dataset = f.get(path);
        const configString = dataset.value[0] as string;
        const json = JSON.parse(configString);
        const config = ConfigDto.parse(json);
        resolve(config.settings.audioPath);
      });

      reader.readAsArrayBuffer(file);
    });
  }
}
