import Plotly, {type Config, type DownloadImgopts} from 'plotly.js-dist-min';
import {useLabelScreenshot} from 'src/components/Label/useLabelScreenshot';
import {PLOTLY_SIZE} from 'src/constants';
import {triggerCanvasDownload} from 'src/utils/trigger-canvas-download';

import {useScatterExport} from './useScatterExport';

interface ScatterExportOptions extends DownloadImgopts {
  scale?: number;
}

export function useScatterConfig() {
  const {screenshotLabel} = useLabelScreenshot();
  const {handleScatterExportClick} = useScatterExport();

  const scatterWidth = PLOTLY_SIZE * (4 / 3);
  const scatterHeight = PLOTLY_SIZE;
  const scatterScale = 4;
  const scatterName = 'SSE-scatter-export';

  const scatterOptions: ScatterExportOptions = {
    filename: scatterName,
    width: scatterWidth,
    height: scatterHeight,
    format: 'svg',
    scale: scatterScale,
  };

  const config: Partial<Config> = {
    displaylogo: false,
    responsive: true,
    modeBarButtonsToAdd: [
      {
        name: 'download-png',
        title: 'Download as PNG with legend',
        icon: Plotly.Icons.camera,
        click: async (gd) => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = scatterWidth * scatterScale;
          canvas.height = scatterHeight * scatterScale;

          if (context === null) {
            return;
          }

          const scatterData = await Plotly.toImage(gd, scatterOptions);
          const scatterImage = new Image();
          scatterImage.src = scatterData;
          scatterImage.onload = () => {
            context.drawImage(scatterImage, 0, 0);
          };

          const legendCanvas = await screenshotLabel();
          if (legendCanvas === null) {
            await Plotly.downloadImage(gd, {...scatterOptions, format: 'png'});
            return;
          }

          const legendContext = legendCanvas?.getContext('2d');
          if (legendContext === null) {
            return;
          }

          const legendScale = 0.5;
          const legendWidth =
            legendContext.canvas.width * scatterScale * legendScale;
          const legendHeight =
            legendContext.canvas.height * scatterScale * legendScale;

          context.drawImage(
            legendCanvas,
            canvas.width - legendWidth,
            canvas.height - legendHeight,
            legendWidth,
            legendHeight,
          );

          triggerCanvasDownload(canvas, scatterName);
        },
      },
      {
        name: 'download-svg',
        title: 'Download as SVG without legend',
        icon: Plotly.Icons['camera-retro'],
        click: async (gd) => {
          await Plotly.downloadImage(gd, scatterOptions);
        },
      },
      {
        name: 'export-csv',
        title: 'Export as CSV',
        icon: Plotly.Icons['disk'],
        click: async () => {
          await handleScatterExportClick();
        },
      },
    ],
    modeBarButtonsToRemove: ['toImage', 'resetCameraLastSave3d'],
  };

  return {
    config: config,
  };
}
