import Excel from 'exceljs';

import {render} from '../renderer';

export class LoadingZone {
  public audioPath: string | null;

  private node: HTMLDivElement;

  private configurationElement: HTMLInputElement;

  private storageElement: HTMLInputElement;

  public constructor() {
    this.audioPath = null;

    this.node = document.getElementById('loading-zone') as HTMLDivElement;
    this.configurationElement = document.getElementById(
      'configuration-input',
    ) as HTMLInputElement;
    this.storageElement = document.getElementById(
      'storage-input',
    ) as HTMLInputElement;

    this.attachConfigurationEvent();
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
        this.audioPath = audioPath;
        await window.electronAPI.startAudioService(audioPath);
        await render();
      },
    );
  }

  private getDirectory(file: File): string {
    return window.electronAPI.getFileDirectory(file);
  }

  private joinPath(dirPath: string, audioPath: string) {
    return window.electronAPI.joinPath(dirPath, audioPath);
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
        const finalPath = this.joinPath(directory, audioPath);
        resolve(finalPath);
      });

      reader.readAsArrayBuffer(file);
    });
  }
}
