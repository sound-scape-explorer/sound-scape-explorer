import Excel from 'exceljs';
import * as hdf5 from 'jsfive';

import {render} from '../renderer';

export class LoadingZone {
  private node: HTMLDivElement;

  private configurationElement: HTMLInputElement;

  private storageElement: HTMLInputElement;

  public constructor() {
    this.node = document.getElementById('loading-zone') as HTMLDivElement;
    this.configurationElement = document.getElementById(
      'configuration-input',
    ) as HTMLInputElement;
    this.storageElement = document.getElementById(
      'storage-input',
    ) as HTMLInputElement;

    this.attachConfigurationEvent();
    this.attachStorageEvent();
  }

  public hide() {
    this.node.style.display = 'none';
  }

  public show() {
    this.node.style.display = 'inherit';
  }

  private attachConfigurationEvent() {
    this.configurationElement.addEventListener(
      'change',
      async (e: InputEvent) => {
        e.preventDefault();

        const input = e.target as HTMLInputElement;
        const files = input.files;

        if (files.length !== 1) {
          alert('Please add only one file');
          return;
        }

        const file = files[0];
        const type =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        if (file.type !== type) {
          alert('Please add only excel file');
          return;
        }

        input.value = null;
        const audioPath = await this.readAudioPathFromExcel(file);
        console.log('LoadingZone/audioPath:', audioPath);
        await window.electronAPI.startAudioService(audioPath);
        await render();
      },
    );
  }

  private isAbsolute(path: string): boolean {
    const isLinux = path[0] === '/';
    const isWindows = path[2] === '/' || path[2] === '\\';
    return isWindows || isLinux;
  }

  private getFinalPath(audioPath: string, directory: string): string {
    if (this.isAbsolute(audioPath)) {
      return audioPath;
    }

    return directory + '/' + audioPath;
  }

  private getDirectory(file: File): string {
    return window.electronAPI.getFileDirectory(file).toString();
  }

  private readAudioPathFromExcel(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('load', async (e) => {
        const data = e.target.result as ArrayBuffer;
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(data);
        const settings = workbook.getWorksheet('Settings');
        const audioPath = settings.getCell('B3').toString();
        const directory = this.getDirectory(file);
        resolve(this.getFinalPath(audioPath, directory));
      });

      reader.readAsArrayBuffer(file);
    });
  }

  private attachStorageEvent() {
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
        alert('Please add only h5 file');
        return;
      }

      input.value = null;
      const audioPath = await this.readAudioPathFromStorage(file);
      await window.electronAPI.startAudioService(audioPath);
      await render();
    });
  }

  private readAudioPathFromStorage(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('load', async (e) => {
        const f = new hdf5.File(e.target.result, file.name);
        const audioPath = f.get('settings').attrs['audio_path'];
        const directory = this.getDirectory(file);
        resolve(this.getFinalPath(audioPath, directory));
      });

      reader.readAsArrayBuffer(file);
    });
  }
}
