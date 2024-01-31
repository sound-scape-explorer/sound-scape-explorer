import Excel from 'exceljs';

import {render} from '../renderer';

export class LoadingZone {
  private node = document.getElementById('loading-zone');

  public constructor() {
    this.attachDrop();
  }

  public hide() {
    this.node.style.display = 'none';
  }

  public show() {
    this.node.style.display = 'block';
  }

  private attachDrop() {
    this.node.addEventListener('change', async (e: InputEvent) => {
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
      await window.electronAPI.startAudioService(audioPath);
      await render();
    });
  }

  private readAudioPathFromExcel(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('load', async (e) => {
        const data = e.target.result as ArrayBuffer;
        const workbook = new Excel.Workbook();
        await workbook.xlsx.load(data);
        const settings = workbook.getWorksheet('Settings');
        const audioPathCell = settings.getCell('B3');
        const directory = window.electronAPI.getFileDirectory(file);
        const audioPath = directory + '/' + audioPathCell.value;
        resolve(audioPath);
      });

      reader.readAsArrayBuffer(file);
    });
  }
}
