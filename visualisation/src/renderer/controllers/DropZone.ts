import Excel from 'exceljs';

import {render} from '../renderer';

export class DropZone {
  private node = document.getElementById('drop-zone');

  public constructor() {
    this.attachDragOver();
    this.attachDrop();
  }

  public hide() {
    this.node.style.display = 'none';
  }

  public show() {
    this.node.style.display = 'block';
  }

  private attachDragOver() {
    this.node.addEventListener('dragover', (e: DragEvent) => {
      e.preventDefault();
    });
  }

  private attachDrop() {
    this.node.addEventListener('drop', async (e: DragEvent) => {
      e.preventDefault();

      const files = e.dataTransfer.files;

      if (files.length !== 1) {
        alert('Please drop only one file');
        return;
      }

      const file = files[0];
      const type =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if (file.type !== type) {
        alert('Please drop only excel file');
        return;
      }

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
